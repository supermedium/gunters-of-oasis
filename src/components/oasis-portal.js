var previousZone = localStorage.getItem('previousZone');
localStorage.setItem('previousZone', window.location.href);

AFRAME.registerComponent('oasis-portal', {
  schema: {
    href: {type: 'string'},
    isBackPortal: {default: false}
  },

  init: function () {
    if (this.data.isBackPortal) {
      if (!previousZone || previousZone === window.location.href) {
        this.el.object3D.visible = false;
        return;
      }
    }

    this.el.addEventListener('click', () => {
      if (this.data.isBackPortal) {
        window.location.href = localStorage.getItem('previousZone');
      } else {
        window.location.href = this.data.href;
      }
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
