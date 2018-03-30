varying vec3 vWorldPosition;
varying float vDistanceToCenter;

void main() {
  vDistanceToCenter = clamp(length(position - vec3(0.0, 0.0, 0.0)), 0.0, 1.0);
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
