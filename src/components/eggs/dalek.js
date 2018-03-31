AFRAME.registerComponent('dalek', {
  init: function () {
    var el;

    for (i = 0; i < Math.floor(utils.random(500) * 4) + 2; i++) {
      el = document.createElement('a-entity');
      el.setAttribute('obj-model', {
        obj: utils.assetPath('assets/models/dalek/model.obj'),
        mtl: utils.assetPath('assets/models/dalek/materials.mtl')
      });
      el.setAttribute('dalek-sound', '');
      el.setAttribute('shadow', {cast: true, receive: false});
      el.object3D.scale.set(8, 8, 8);
      el.object3D.rotation.set(0, Math.PI, 0);
      el.object3D.position.set(
        utils.random(i + 99) * 20 - 10,
        1,
        utils.random(i + 89) * 20 - 10
      );
      this.el.appendChild(el);
    }
  }
});
