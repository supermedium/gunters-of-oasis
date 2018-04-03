var SoundPool = require('../lib/soundpool');

/**
 * Allow teleport into portal.
 * Update line and hit entity colors.
 */
AFRAME.registerComponent('teleport-listener', {
  dependencies: ['teleport-controls'],

  init: function () {
    var el = this.el;
    var intersections;
    var soundPool;
    var teleportFader;

    intersections = el.components['teleport-controls'].intersections;

    soundPool = SoundPool(utils.assetPath('assets/audio/portal.wav'), 0.6, 5);

    teleportFader = document.getElementById('teleportFader');
    this.el.addEventListener('teleported', () => {
      if (!intersections.length) { return; }

      teleportFader.object3D.visible = true;
      setTimeout(() => {
        teleportFader.object3D.visible = false;
      }, 160);

      if (intersections[0].object.el.classList.contains('portal')) {
        intersections[0].object.el.emit('click');
      } else {
        soundPool.play();
      }
    });

    this.currentIntersection = null;
  },

  tick: function () {
    var el = this.el;
    var intersection;

    if (!el.components['teleport-controls'].active) { return; }

    intersection = el.components['teleport-controls'].intersections[0];

    if (!intersection) {
      if (this.currentIntersection) { this.currentIntersection.emit('mouseleave'); }
      this.currentIntersection = null;
      return;
    }

    if (intersection.object.el === this.currentIntersection) { return; }

    if (this.currentIntersection) { this.currentIntersection.emit('mouseleave'); }
    intersection.object.el.emit('mouseenter');
    this.currentIntersection = intersection.object.el;
  }
});
