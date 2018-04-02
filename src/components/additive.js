AFRAME.registerComponent('additive', {
  init: function () {
    this.el.addEventListener('subobjectloaded', function(ev){
      ev.detail.material.blending = THREE.AdditiveBlending;
    });
    this.el.addEventListener('model-loaded', function(ev){
      ev.detail.model.material.blending = THREE.AdditiveBlending;
    });
  }
});
