var r = Math.random();
var g = Math.random();
var b = Math.random();

var r2 = Math.random();
var g2 = Math.random();
var b2 = Math.random();

AFRAME.registerComponent('shifting-colors', {
  depdendencies: ['environment'],

  init: function () {
    this.rDir = 1;
    this.gDir = 1;
    this.bDir = 1;
    this.rDir2 = 1;
    this.gDir2 = 1;
    this.bDir2 = 1;
  },

  tick: function (t, dt) {
    var color;
    var dressing1;
    var mesh;

    if (!dt) { return; }

    dressing1 = this.el.components.environment.dressing1.getObject3D('mesh');
    if (dressing1) {
      dressing1 = dressing1.children[0];
      color = dressing1.material.color;
      color.r += (1 / (200 * dt * r)) * this.rDir;
      color.g += (1 / (200 * dt * g)) * this.gDir;
      color.b += (1 / (200 * dt * b)) * this.bDir;

      if (color.r > 1) { color.r = 1; this.rDir = -1; }
      if (color.r < 0) { color.r = 0; this.rDir = 1; }
      if (color.g > 1) { color.g = 1; this.gDir = -1; }
      if (color.g < 0) { color.g = 0; this.gDir = 1; }
      if (color.b > 1) { color.b = 1; this.bDir = -1; }
      if (color.b < 0) { color.b = 0; this.bDir = 1; }
    }

    dressing2 = this.el.components.environment.dressing2.getObject3D('mesh');
    if (dressing2) {
      dressing2 = dressing2.children[0];
      color = dressing2.material.color;
      color.r += (1 / (200 * dt * r2)) * this.rDir2;
      color.g += (1 / (200 * dt * g2)) * this.gDir2;
      color.b += (1 / (200 * dt * b2)) * this.bDir2;

      if (color.r > 1) { color.r = 1; this.rDir2 = -1; }
      if (color.r < 0) { color.r = 0; this.rDir2 = 1; }
      if (color.g > 1) { color.g = 1; this.gDir2 = -1; }
      if (color.g < 0) { color.g = 0; this.gDir2 = 1; }
      if (color.b > 1) { color.b = 1; this.bDir2 = -1; }
      if (color.b < 0) { color.b = 0; this.bDir2 = 1; }
    }
  }
});

function random (x) {
  var i;
  var seed;
  seed = 0;
  for (i = 0; i < window.location.href.length; i++) {
    seed += window.location.href.charCodeAt(i);
  }
  return parseFloat('0.' + Math.sin(seed * 9999 * x).toString().substr(7));
}

function randomColor () {
  return new THREE.Color(random(0), random(1), random(2));
}
