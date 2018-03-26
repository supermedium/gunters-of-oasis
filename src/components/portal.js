/**
 * Portal. Modified from link component.
 */
AFRAME.registerComponent('oasis-portal', {
  schema: {
    backgroundColor: {default: 'red', type: 'color'},
    borderColor: {default: 'white', type: 'color'},
    highlighted: {default: false},
    highlightedColor: {default: '#24CAFF', type: 'color'},
    href: {default: ''},
    image: {type: 'asset'},
    on: {default: 'click'},
    title: {default: ''},
    titleColor: {default: 'white', type: 'color'},
    visualAspectEnabled: {default: true}
  },

  init: function () {
    this.navigate = this.navigate.bind(this);
    this.previousQuaternion = undefined;
    this.quaternionClone = new THREE.Quaternion();
    this.initVisualAspect();
  },

  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    var backgroundColor;
    var strokeColor;

    backgroundColor = data.highlighted ? data.highlightedColor : data.backgroundColor;
    strokeColor = data.highlighted ? data.highlightedColor : data.borderColor;
    el.setAttribute('material', 'backgroundColor', backgroundColor);
    el.setAttribute('material', 'strokeColor', strokeColor);

    if (!data.image || oldData.image === data.image) { return; }

    el.setAttribute('material', 'pano',
                    typeof data.image === 'string' ? data.image : data.image.src);
  },

  play: function () {
    this.el.addEventListener(this.data.on, this.navigate);
  },

  initVisualAspect: function () {
    var el = this.el;
    var semiSphereEl;
    var sphereEl;
    var textEl;

    if (!this.data.visualAspectEnabled) { return; }

    textEl = this.textEl = this.textEl || document.createElement('a-entity');
    sphereEl = this.sphereEl = this.sphereEl || document.createElement('a-entity');
    semiSphereEl = this.semiSphereEl = this.semiSphereEl || document.createElement('a-entity');

    // Set portal.
    el.setAttribute('geometry', {primitive: 'circle', radius: 1.0, segments: 64});
    el.setAttribute('material', {shader: 'oasisPortal', pano: this.data.image, side: 'double'});

    // Set text that displays the link title and URL.
    textEl.setAttribute('text', {
      color: this.data.titleColor,
      align: 'center',
      font: 'kelsonsans',
      value: this.data.title || this.data.href,
      width: 4
    });
    textEl.setAttribute('position', '0 1.5 0');
    el.appendChild(textEl);

    // Set sphere rendered when camera is close to portal to allow user to peek inside.
    semiSphereEl.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 1.0,
      phiStart: 0,
      segmentsWidth: 64,
      segmentsHeight: 64,
      phiLength: 180,
      thetaStart: 0,
      thetaLength: 360
    });
    semiSphereEl.setAttribute('material', {
      shader: 'portal',
      borderEnabled: 0.0,
      pano: this.data.image,
      side: 'back'
    });
    semiSphereEl.setAttribute('rotation', '0 180 0');
    semiSphereEl.setAttribute('position', '0 0 0');
    semiSphereEl.setAttribute('visible', false);
    el.appendChild(semiSphereEl);

    // Set sphere rendered when camera is close to portal to allow user to peek inside.
    sphereEl.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 10,
      segmentsWidth: 64,
      segmentsHeight: 64
    });
    sphereEl.setAttribute('material', {
      shader: 'portal',
      borderEnabled: 0.0,
      pano: this.data.image,
      side: 'back'
    });
    sphereEl.setAttribute('visible', false);
    el.appendChild(sphereEl);
  },

  navigate: function () {
    window.location = this.data.href;
  },

  /**
   * 1. Swap plane that represents portal with sphere with a hole when the camera is close
   * so user can peek inside portal. Sphere is rendered on oposite side of portal
   * from where user enters.
   * 2. Place the url/title above or inside portal depending on distance to camera.
   * 3. Face portal to camera when far away from user.
   */
  tick: (function () {
    var cameraWorldPosition = new THREE.Vector3();
    var elWorldPosition = new THREE.Vector3();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();

    return function () {
      var el = this.el;
      var object3D = el.object3D;
      var camera = el.sceneEl.camera;
      var cameraPortalOrientation;
      var distance;
      var textEl = this.textEl;

      if (!this.data.visualAspectEnabled) { return; }

      // Update matrices
      object3D.updateMatrixWorld();
      camera.parent.updateMatrixWorld();
      camera.updateMatrixWorld();

      object3D.matrix.decompose(elWorldPosition, quaternion, scale);
      elWorldPosition.setFromMatrixPosition(object3D.matrixWorld);
      cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
      distance = elWorldPosition.distanceTo(cameraWorldPosition);

      if (distance > 20) {
        // Store original orientation to be restored when the portal stops facing the camera.
        if (!this.previousQuaternion) {
          this.quaternionClone.copy(quaternion);
          this.previousQuaternion = this.quaternionClone;
        }
        // If the portal is far away from the user, face portal to camera.
        object3D.lookAt(cameraWorldPosition);
      } else {
        // When portal is close to the user/camera.
        cameraPortalOrientation = this.calculateCameraPortalOrientation();
        // If user gets very close to portal, replace with holed sphere they can peek in.
        if (distance < 0.5) {
          // Configure text size and sphere orientation depending side user approaches portal.
          if (this.semiSphereEl.getAttribute('visible') === true) { return; }
          textEl.setAttribute('text', 'width', 1.5);
          if (cameraPortalOrientation <= 0.0) {
            textEl.setAttribute('position', '0 0 0.75');
            textEl.setAttribute('rotation', '0 180 0');
            this.semiSphereEl.setAttribute('rotation', '0 0 0');
          } else {
            textEl.setAttribute('position', '0 0 -0.75');
            textEl.setAttribute('rotation', '0 0 0');
            this.semiSphereEl.setAttribute('rotation', '0 180 0');
          }
          el.getObject3D('mesh').visible = false;
          this.semiSphereEl.setAttribute('visible', true);
          this.peekCameraPortalOrientation = cameraPortalOrientation;
        } else {
          // Calculate wich side the camera is approaching the camera (back / front).
          // Adjust text orientation based on camera position.
          if (cameraPortalOrientation <= 0.0) {
            textEl.setAttribute('rotation', '0 180 0');
          } else {
            textEl.setAttribute('rotation', '0 0 0');
          }
          textEl.setAttribute('text', 'width', 5);
          textEl.setAttribute('position', '0 1.5 0');
          el.getObject3D('mesh').visible = true;
          this.semiSphereEl.setAttribute('visible', false);
          this.peekCameraPortalOrientation = undefined;
        }
        if (this.previousQuaternion) {
          object3D.quaternion.copy(this.previousQuaternion);
          this.previousQuaternion = undefined;
        }
      }
    };
  })(),

  /**
   * Calculate whether the camera faces the front or back face of the portal.
   * @returns {number} > 0 if camera faces front of portal, < 0 if it faces back of portal.
   */
  calculateCameraPortalOrientation: (function () {
    var mat4 = new THREE.Matrix4();
    var cameraPosition = new THREE.Vector3();
    var portalNormal = new THREE.Vector3(0, 0, 1);
    var portalPosition = new THREE.Vector3(0, 0, 0);

    return function () {
      var el = this.el;
      var camera = el.sceneEl.camera;

      // Reset tmp variables.
      cameraPosition.set(0, 0, 0);
      portalNormal.set(0, 0, 1);
      portalPosition.set(0, 0, 0);

      // Apply portal orientation to the normal.
      el.object3D.matrixWorld.extractRotation(mat4);
      portalNormal.applyMatrix4(mat4);

      // Calculate portal world position.
      el.object3D.updateMatrixWorld();
      el.object3D.localToWorld(portalPosition);

      // Calculate camera world position.
      camera.parent.parent.updateMatrixWorld();
      camera.parent.updateMatrixWorld();
      camera.updateMatrixWorld();
      camera.localToWorld(cameraPosition);

      // Calculate vector from portal to camera.
      // (portal) -------> (camera)
      cameraPosition.sub(portalPosition).normalize();
      portalNormal.normalize();

      // Side where camera approaches portal is given by sign of dot product of portal normal
      // and portal to camera vectors.
      return Math.sign(portalNormal.dot(cameraPosition));
    };
  })()
});

/* eslint-disable */
AFRAME.registerShader('oasisPortal', {
  schema: {
    borderEnabled: {default: 1.0, type: 'int', is: 'uniform'},
    backgroundColor: {default: 'red', type: 'color', is: 'uniform'},
    pano: {type: 'map', is: 'uniform'},
    strokeColor: {default: 'white', type: 'color', is: 'uniform'}
  },

  vertexShader: require('./shaders/oasisPortalVertex.glsl'),

  fragmentShader: require('./shaders/oasisPortalFragment.glsl')
});
/* eslint-enable */
