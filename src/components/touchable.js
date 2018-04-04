AFRAME.registerComponent('touchable', {
  play: function () {
    this.el.sceneEl.systems.touch.register(this.el);
  }
});
