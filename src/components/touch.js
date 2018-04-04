AFRAME.registerSystem('touch', {
  init: function () {
    this.touchables = [];
  },

  register: function (el) {
    this.touchables.push(el);
  }
});

AFRAME.registerComponent('touch', {
  schema: {
    distance: {default: 0.50}
  },

  init: function () {
    this.touched = [];
    this.worldVec3 = new THREE.Vector3();
    this.tick = AFRAME.utils.throttleTick(this.tick.bind(this), 500);
  },

  tick: function () {
    var el = this.el;
    var i;
    var touchables = el.sceneEl.systems.touch.touchables;

    if (!touchables || !touchables.length) { return; }

    el.object3D.getWorldPosition(this.worldVec3);

    this.touched.length = 0;
    for (i = 0; i < touchables.length; i++) {
      if (this.worldVec3.distanceTo(touchables[i].object3D.position) < this.data.distance) {
        this.touched.push(touchables[i]);
      }
    }

    if (!this.touched.length) { return; }

    for (i = 0; i < this.touched.length; i++) {
      this.touched[i].emit('touched');
      touchables.splice(this.touched[i], 1);
    }
  }
});
