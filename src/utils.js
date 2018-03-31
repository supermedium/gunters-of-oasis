window.utils = {};

/**
 * Helper to visualize lines.
 */
window.utils.drawLine = (function () {
  var els = {};
  return function (name, vec1, vec2, color) {
    if (!els[name]) {
      els[name] = document.createElement('a-entity');
      els[name].setAttribute('line', 'color', color || '#FFF');
      els[name].setAttribute('id', name);
      AFRAME.scenes[0].appendChild(els[name]);
    }
    els[name].setAttribute('line', 'start', vec1.clone());
    els[name].setAttribute('line', 'end', vec2.clone());
  };
})();

/**
 * Helper to visualize vectors.
 */
window.utils.drawVec3 = (function () {
  var els = {};
  return function (name, vec3, color) {
    if (!els[name]) {
      els[name] = document.createElement('a-sphere');
      els[name].setAttribute('color', color || '#FFF');
      els[name].setAttribute('radius', 0.02);
      els[name].setAttribute('id', name);
      els[name].setAttribute('text', {align: 'center', value: name, side: 'double'});
      AFRAME.scenes[0].appendChild(els[name]);
    }
    els[name].setAttribute('position', vec3.clone());
  };
})();

/**
 * Helper to get center point of face.
 */
window.utils.getFaceCenter = (function () {
  return function (mesh, face, targetVec3) {
    targetVec3 = targetVec3 || new THREE.Vector3();
    return targetVec3
      .copy(mesh.geometry.vertices[face.a])
      .add(mesh.geometry.vertices[face.b])
      .add(mesh.geometry.vertices[face.c])
      .divideScalar(3);
  };
})();

window.utils.assetPath = function (asset) {
  return AFRAME.scenes[0].dataset.isHome === 'true' ? asset : `../${asset}`;
}

window.utils.random = function (x) {
  var i;
  var seed;
  seed = 0;
  for (i = 0; i < window.location.href.length; i++) {
    seed += window.location.href.charCodeAt(i);
  }
  return parseFloat('0.' + Math.sin(seed * 9999 * x).toString().substr(7));
}
