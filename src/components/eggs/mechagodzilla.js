AFRAME.registerComponent('mechagodzilla', {
  init: function () {
    var el;
    el = document.createElement('a-entity');
    el.setAttribute('obj-model', {
      obj: utils.assetPath('assets/models/mechagodzilla/model.obj'),
      mtl: utils.assetPath('assets/models/mechagodzilla/materials.mtl')
    });
    el.object3D.scale.set(10, 10, 10);
    el.object3D.rotation.set(0, Math.PI, 0);
    el.object3D.position.set(
      window.utils.random(100) * 40,
      25,
      -30
    );
    this.el.appendChild(el);
  }
});
