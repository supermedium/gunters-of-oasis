var utils = window.utils;

AFRAME.registerComponent('cromulon', {
  init: function () {
    var audio;
    var el = this.el;
    var i;
    var p;
    var s;

    for (i = 0, p = 0, s = 0; i < Math.floor(random(30) * 5) + 3; i++, p++, s++) {
      this.createCromulon(i, p, s);
    }

    audio = new Audio(utils.assetPath('assets/audio/cromulon.mp3'));
    audio.volume = 0.5;
    setInterval(() => {
      if (Math.random() < 0.11) { audio.play(); }
    }, 1000);
  },

  createCromulon: function (i, p, s) {
    var img;
    var scale;

    img = document.createElement('a-image');
    img.setAttribute('src', utils.assetPath('assets/img/cromulon.png'));
    img.setAttribute('color', randomColor(s));

    scale = random(s) * 30 + 10;
    img.object3D.scale.set(scale, scale, scale);
    img.object3D.position.set(
      random(p) * 150 - 75,
      random(p + 20) * 30 + 25,
      random(p + 10) * 150 - 75);
    img.object3D.lookAt(0, 0, 0);

    img.object3D.visible = false;
    img.addEventListener('materialtextureloaded', () => {
      img.object3D.visible = true;
    });

    this.el.sceneEl.appendChild(img);
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
