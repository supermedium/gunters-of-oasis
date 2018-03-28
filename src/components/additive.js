AFRAME.registerComponent('additive', {
  init: function () {
    this.el.addEventListener('subobjectloaded', function(ev){
      ev.detail.material.blending = THREE.AdditiveBlending;
    });
  }
});
