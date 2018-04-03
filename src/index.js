function requireAll (req) { req.keys().forEach(req); }

require('./utils');

require('aframe-animation-component');
require('aframe-event-set-component');
require('aframe-layout-component');
require('aframe-look-at-component');
require('aframe-proxy-event-component');
require('aframe-randomizer-components');
require('aframe-slice9-component');
require('aframe-teleport-controls');

require('networked-aframe');

requireAll(require.context('./components/', true, /\.js$/));

window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('a-scene').dataset.isHome === 'true') {
    navigator.serviceWorker.register('serviceWorker.js');
  } else {
    navigator.serviceWorker.register('../serviceWorker.js');
  }
});
