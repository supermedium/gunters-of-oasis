AFRAME.registerComponent('item', {
  schema: {
    message: {type: 'string'},
    storeAs: {type: 'string'}
  },

  init: function () {
    var camera;
    var cameraFront;
    var el = this.el;
    var textEl;

    el.setAttribute('mixin', el.getAttribute('mixin') + ' item');

    // Message.
    textEl = document.createElement('a-entity');
    textEl.classList.add('itemText');
    textEl.setAttribute('mixin', 'itemText');
    textEl.setAttribute('text', 'value', this.data.message);
    textEl.object3D.position.copy(el.object3D.position);
    textEl.object3D.position.y = -1;
    textEl.object3D.position.z -= 0.5;
    el.sceneEl.appendChild(textEl);

    // Shadow.
    shadowEl = document.createElement('a-entity');
    shadowEl.setAttribute('mixin', 'shadow');
    shadowEl.object3D.position.copy(el.object3D.position);
    shadowEl.object3D.position.y = 0.1;
    el.sceneEl.appendChild(shadowEl);

    // Already have item.
    if (localStorage.getItem(this.data.storeAs) === 'true') {
      el.object3D.visible = false;
      textEl.object3D.position.y = 1.6;
      textEl.object3D.lookAt(0, 1.6, 0);
      textEl.setAttribute('mixin', 'itemText hoverAnimation');
      return;
    }

    camera = document.getElementById('camera');
    cameraFront = document.getElementById('cameraFront');

    el.addEventListener('touched', () => {
      textEl.setAttribute('text', 'value', this.data.message);

      cameraFront.object3D.getWorldPosition(textEl.object3D.position);
      textEl.object3D.lookAt(camera.object3D.getWorldPosition());
      textEl.object3D.position.y = -1;

      textEl.emit('itemtouched');
      localStorage.setItem(this.data.storeAs, 'true');
    });
  }
});
