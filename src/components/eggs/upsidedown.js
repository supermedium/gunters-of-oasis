AFRAME.registerComponent('upsidedown', {
  dependencies: ['environment'],

  init: function () {
    var i;
    var intensity;
    var lights;
    var portals;

    this.el.setAttribute('environment', {
      dressing1Color: randomGrayscaleColor(0),
      dressing2Color: randomGrayscaleColor(1),
      gridColor: randomGrayscaleColor(2),
      groundColor: randomGrayscaleColor(3),
      groundColor2: randomGrayscaleColor(4),
      horizonColor: randomGrayscaleColor(5),
      skyColor: randomGrayscaleColor(6),
      varyColor: false
    });

    portals = document.querySelectorAll('.portal');
    for (i = 0; i < portals.length; i++) {
      portals[i].setAttribute('material', 'isGrayscale', 1);
      portals[i].setAttribute('oasis-portal', 'color', '#FAFAFA');
      portals[i].querySelector('.portalText').setAttribute('text', 'color', '#FAFAFA');
      portals[i].querySelector('.portalEffect1').setAttribute('material', 'color', '#111');
      portals[i].querySelector('.portalEffect2').setAttribute('material', 'color', '#AAA');
    }

    lights = [
      this.el.components.environment.hemilight,
      this.el.components.environment.sunlight
    ];
    lights[0].setAttribute('light', 'intensity', 0);
    lights[1].setAttribute('light', 'intensity', 0);

    /*
      setInterval(() => {
        if (Math.random() > 0.15) { return; }
        this.flickerLight(lights[0]);
        this.flickerLight(lights[1]);
      }, 500);
    */
  },

  flickerLight: function (light) {
    light.setAttribute('light', 'intensity', .1);
    setTimeout(() => {
      light.setAttribute('light', 'intensity', 0);
    }, 300);
  }
});

function randomGrayscaleColor (i) {
  var color;
  i += 1234;
  color = utils.random(i);
  return `#${new THREE.Color(color, color, color).getHexString()}`;
}
