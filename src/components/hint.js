AFRAME.registerComponent('hint', {
  init: function () {
    this.hands = [
      document.getElementById('primaryHand'),
      document.getElementById('secondaryHand')
    ];
  },

  tick: (function () {
    var pos = new THREE.Vector3();
    return function () {
      var i;
      for (i = 0; i < this.hands.length; i++) {
        this.hands[i].object3D.getWorldPosition(pos);
        if (pos.sub(this.el.object3D.position).length() < 0.5) {
          this.el.emit('activatehint');
          this.el.sceneEl.removeBehavior(this);
          return;
        }
      }
    };
  })()
});
