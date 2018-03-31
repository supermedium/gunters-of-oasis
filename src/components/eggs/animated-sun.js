AFRAME.registerComponent('animated-sun', {
  depdendencies: ['environment'],

  play: function () {
    var el = this.el;
    setTimeout(() => {
      el.components['environment'].sunlight.setAttribute('animation__light', {
        property: 'components.light.light.intensity',
        dir: 'alternate',
        dur: 1200,
        easing: 'easeInOutCubic',
        from: el.components['environment'].sunlight.getAttribute('light').intensity,
        loop: true,
        to: 0.2
      });

      el.components['environment'].sunlight.setAttribute('animation__position', {
        property: 'object3D.position.x',
        dir: 'alternate',
        dur: 3000,
        easing: 'easeInOutCubic',
        from: '-10',
        loop: true,
        to: 10
      });
    }, 1000);
  }
});
