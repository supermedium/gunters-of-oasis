/**
 * Keyboard bindings to control controller.
 * Position controller in front of camera.
 */
AFRAME.registerComponent('debug-controller', {
  schema: {
    enabled: {default: false}
  },

  init: function () {
    var primaryHand;
    var primaryHand;

    if (!this.data.enabled || !AFRAME.utils.getUrlParameter('debug')) { return; }

    console.log('%c debug-controller enabled ', 'background: #111; color: red');

    this.isTriggerDown = false;

    primaryHand = document.getElementById('primaryHand');
    primaryHand.object3D.position.set(0.2, 1.5, -0.5);

    document.addEventListener('keydown', evt => {
      var primaryPosition;
      var primaryRotation;

      if (!evt.shiftKey) { return; }

      // <space> for trigger.
      if (evt.keyCode === 32) {
        if (this.isTriggerDown) {
          primaryHand.emit('triggerup');
          this.isTriggerDown = false;
        } else {
          primaryHand.emit('triggerdown');
          this.isTriggerDown = true;
        }
        return;
      }

      // Position bindings.
      primaryPosition = primaryHand.object3D.position;
      if (evt.keyCode === 72) { primaryPosition.x -= 0.01 }  // h.
      if (evt.keyCode === 74) { primaryPosition.y -= 0.01 }  // j.
      if (evt.keyCode === 75) { primaryPosition.y += 0.01 }  // k.
      if (evt.keyCode === 76) { primaryPosition.x += 0.01 }  // l.
      if (evt.keyCode === 59 || evt.keyCode === 186) { primaryPosition.z -= 0.01 }  // ;.
      if (evt.keyCode === 222) { primaryPosition.z += 0.01 }  // ;.

      // Rotation bindings.
      var primaryRotation
      primaryRotation = primaryHand.getAttribute('rotation');
      if (evt.keyCode === 89) { primaryRotation.x -= 10 }  // y.
      if (evt.keyCode === 79) { primaryRotation.x += 10 }  // o.
      if (evt.keyCode === 85) { primaryRotation.y -= 10 }  // u.
      if (evt.keyCode === 73) { primaryRotation.y += 10 }  // i.

      primaryHand.setAttribute('rotation', AFRAME.utils.clone(primaryRotation));
    });
  },

  play: function () {
    setTimeout(() => {
      document.getElementById('primaryHand').emit('controllerconnected', {
        name: 'vive-controls'
      });
    }, 1000);
  }
});
