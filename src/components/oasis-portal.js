AFRAME.registerComponent('oasis-portal', {
  schema: {
    href: {type: 'string'}
  },

  init: function () {
    this.el.addEventListener('click', () => {
      window.location.href = this.data.href;
    });
  }
});

AFRAME.registerShader('oasisPortal', {
  schema: {
    backgroundColor: {default: 'red', type: 'color', is: 'uniform'},
    pano: {type: 'map', is: 'uniform'},
    strokeColor: {default: 'white', type: 'color', is: 'uniform'}
  },

  vertexShader: require('./shaders/oasisPortalVertex.glsl'),

  fragmentShader: require('./shaders/oasisPortalFragment.glsl')
});
