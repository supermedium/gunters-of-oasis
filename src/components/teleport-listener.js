/**
 * Allow teleport into portal.
 * Update line and hit entity colors.
 */
AFRAME.registerComponent('teleport-listener', {
  dependencies: ['teleport-controls'],

  init: function () {
    var el = this.el;
    var intersections;

    intersections = el.components['teleport-controls'].intersections;

    this.el.addEventListener('triggerup', () => {
      if (!intersections.length) { return; }
      if (intersections[0].object.el.classList.contains('portal')) {
        intersections[0].object.el.emit('click');
      }
    });
  }
});
