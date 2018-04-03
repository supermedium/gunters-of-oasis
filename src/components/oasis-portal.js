var SoundPool = require('../lib/soundpool');

var previousZone = localStorage.getItem('previousZone');
var visitedZones = JSON.parse(localStorage.getItem('visitedZones') || '{}');

var hoverSoundPool;
document.addEventListener('DOMContentLoaded', () => {
  hoverSoundPool = SoundPool(utils.assetPath('assets/audio/hover.wav'), 0.5, 2);
});

AFRAME.registerComponent('oasis-portal', {
  schema: {
    href: {type: 'string'},
    isBackPortal: {default: false},
    isHomePortal: {default: false}
  },

  init: function () {
    var el = this.el;
    var portalSound;

    portalSound = new Audio(utils.assetPath('assets/audio/portal.wav'));
    portalSound.volume = 0.25;

    // Hide back portal if there is no back to go to.
    if (this.data.isBackPortal) {
      if (!previousZone || previousZone === window.location.href) {
        el.object3D.visible = false;
        return;
      }
    }

    // Navigate.
    el.addEventListener('click', () => {
      portalSound.play();
      setTimeout(() => {
        if (this.data.isBackPortal) {
          window.location.href = localStorage.getItem('previousZone');
        } else {
          visitedZones[this.data.href] = true;
          localStorage.setItem('previousZone', window.location.href);
          localStorage.setItem('visitedZones', JSON.stringify(visitedZones));
          window.location.href = this.data.href;
        }
      }, 500);
    });

    el.addEventListener('mouseenter', () => {
      hoverSoundPool.play();
    });

    // Change border color if visited already.
    if (localStorage.getItem('waybackmachine') === 'true' &&
        visitedZones[this.data.href]) {
      this.setColor('#AF55AF');
    }

    if (this.data.isBackPortal) { this.setColor('#6688cc'); }
    if (this.data.isHomePortal) { this.setColor('#33aa33'); }
  },

  setColor: function (color) {
    var el = this.el;
    el.setAttribute('material', 'strokeColor', color);
    el.querySelector('.portalEffect1').setAttribute('material', 'color', color);
    el.querySelector('.portalText').setAttribute('text', 'color', color);

    el.setAttribute('animation__mouseenter', 'from', color);
    el.setAttribute('animation__mouseleave', 'to', color);
  }
});

AFRAME.registerShader('oasisPortal', {
  schema: {
    backgroundColor: {default: 'red', type: 'color', is: 'uniform'},
    isGrayscale: {type: 'int', is: 'uniform', default: 0.0},
    pano: {type: 'map', is: 'uniform'},
    strokeColor: {default: 'white', type: 'color', is: 'uniform'},
    time: {type: 'time', is: 'uniform'}
  },

  vertexShader: require('./shaders/oasisPortalVertex.glsl'),

  fragmentShader: require('./shaders/oasisPortalFragment.glsl')
});
