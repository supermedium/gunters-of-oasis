#define RECIPROCAL_PI2 0.15915494
uniform sampler2D pano;
uniform vec3 backgroundColor;
uniform vec3 strokeColor;
varying float vDistance;
varying float vDistanceToCenter;
varying vec3 vWorldPosition;

void main() {
  vec3 direction = normalize(vWorldPosition - cameraPosition);
  vec2 sampleUV;

  float borderThickness = 0.94;

  sampleUV.x = atan(direction.z, -direction.x) * -RECIPROCAL_PI2 + 0.5;
  sampleUV.y = saturate(direction.y * 0.5  + 0.5);

  if (vDistanceToCenter > borderThickness) {
    gl_FragColor = vec4(strokeColor, 1.0);
  } else {
    gl_FragColor = texture2D(pano, sampleUV);
  }
}
