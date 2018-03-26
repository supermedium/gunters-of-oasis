function requireAll (req) { req.keys().forEach(req); }

require('aframe-animation-component');
require('aframe-environment-component');
require('aframe-event-set-component');
require('aframe-layout-component');
require('aframe-look-at-component');
require('aframe-proxy-event-component');
require('aframe-slice9-component');
require('aframe-teleport-controls');

requireAll(require.context('./components/', true, /\.js$/));
