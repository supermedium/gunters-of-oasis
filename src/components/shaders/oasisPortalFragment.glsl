#define RECIPROCAL_PI2 0.15915494,
uniform sampler2D pano;
uniform vec3 strokeColor;
uniform vec3 backgroundColor;
uniform float borderEnabled;
varying float vDistanceToCenter;
varying float vDistance;
varying vec3 vWorldPosition;

void main() {
  vec3 direction = normalize(vWorldPosition - cameraPosition);
  vec2 sampleUV;

  float borderThickness = 0.94;

  sampleUV.y = saturate(direction.y * 0.5  + 0.5);
  sampleUV.x = atan(direction.z, -direction.x) * -RECIPROCAL_PI2 + 0.5;

  if (vDistanceToCenter > borderThickness && borderEnabled == 1.0) {
    gl_FragColor = vec4(strokeColor, 1.0);
  } else {
    gl_FragColor = mix(texture2D(pano, sampleUV), vec4(backgroundColor, 1.0), clamp(pow((vDistance / 15.0), 2.0), 0.0, 1.0));
  }
}
