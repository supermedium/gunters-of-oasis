AFRAME.registerComponent('random-color-environment', {
  dependencies: ['environment'],

  init: function () {
    this.el.setAttribute('environment', {
      dressing1Color: randomColor(0),
      dressing2Color: randomColor(1),
      gridColor: randomColor(2),
      groundColor: randomColor(3),
      groundColor2: randomColor(4),
      horizonColor: randomColor(5),
      skyColor: randomColor(6)
    });
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

function randomColor (i) {
  return `#${new THREE.Color(random(i), random(i + 1), random(i + 2)).getHexString()}`;
}
