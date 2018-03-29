var previousZone = localStorage.getItem('previousZone');
localStorage.setItem('previousZone', window.location.href);

var visitedZones = JSON.parse(localStorage.getItem('visitedZones') || '[]');
visitedZones.push(window.location.href);
localStorage.setItem('visitedZones', JSON.stringify(visitedZones));

AFRAME.registerComponent('oasis-portal', {
  schema: {
    href: {type: 'string'},
    isBackPortal: {default: false},
    isHomePortal: {default: false}
  },

  init: function () {
    var el = this.el;

    // Hide back portal if there is no back to go to.
    if (this.data.isBackPortal) {
      if (!previousZone || previousZone === window.location.href) {
        el.object3D.visible = false;
        return;
      }
    }

    // Navigate.
    el.addEventListener('click', () => {
      if (this.data.isBackPortal) {
        window.location.href = localStorage.getItem('previousZone');
      } else {
        window.location.href = this.data.href;
      }
    });

    // Change border color if visited already.
    if (visitedZones.indexOf(this.data.href) !== -1) {
      el.setAttribute('material', 'strokeColor', '#480355');
    }

    if (this.data.isBackPortal) { el.setAttribute('material', 'strokeColor', '#e6e8e6'); }
    if (this.data.isHomePortal) { el.setAttribute('material', 'strokeColor', '#3772ff'); }
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
