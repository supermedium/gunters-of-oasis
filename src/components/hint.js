var HINTS_OPENED = JSON.parse(localStorage.getItem('hintsOpened') || '{}');

AFRAME.registerComponent('hint', {
  schema: {
    near: {default: false}
  },

  init: function () {
    var camera;
    var cameraFront;
    var el = this.el;
    var textEl;

    // Message.
    textEl = document.createElement('a-entity');
    textEl.classList.add('itemText');
    textEl.setAttribute('mixin', 'itemText');
    textEl.object3D.position.copy(el.object3D.position);
    textEl.object3D.position.y = -1;
    textEl.object3D.position.z -= 0.5;
    if (localStorage.getItem('bronzekey') === 'true' || localStorage.getItem('jadekey') === 'true') {
      textEl.setAttribute('text', 'value', this.data.near
        ? 'THE EGG IS NEAR\nWOULD YOU KINDLY...KEEP HUNTING?\n~'
        : 'OUR EGG IS IN ANOTHER CASTLE\n~');
    } else {
      textEl.setAttribute('text', 'value', `FIND THE KEY\nSOMETIMES YOU JUST HAVE TO\nGO BACKWARDS\n~`);
    }
    el.sceneEl.appendChild(textEl);

    // Already touched.
    if (HINTS_OPENED[window.location.href]) {
      el.object3D.visible = false;
      textEl.object3D.position.y = 1.6;
      textEl.object3D.lookAt(0, 1.6, 0);
      return;
    }

    cameraFront = document.getElementById('cameraFront');

    el.addEventListener('touched', () => {
      cameraFront.object3D.getWorldPosition(textEl.object3D.position);
      textEl.object3D.lookAt(camera.object3D.getWorldPosition());
      textEl.emit('itemtouched');
      HINTS_OPENED[window.location.href] = true;
      localStorage.setItem('hintsOpened', JSON.stringify(HINTS_OPENED));
    });
  }
});
