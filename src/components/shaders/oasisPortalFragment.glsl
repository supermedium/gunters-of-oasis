#define RECIPROCAL_PI2 0.15915494
uniform float time;
uniform int isGrayscale;
uniform sampler2D pano;
uniform vec3 backgroundColor;
varying float vDistance;
varying float vDistanceToCenter;
varying vec3 vWorldPosition;

void main() {
  float alpha;
  float gray;
  vec3 color;
  vec3 direction = normalize(vWorldPosition - cameraPosition);
  vec2 sampleUV;
  vec2 sampleA;
  vec2 sampleB;

  float borderThickness = 0.94;

  sampleUV.x = atan(direction.z, -direction.x) * -RECIPROCAL_PI2 + 0.5;
  sampleUV.y = saturate(direction.y * 0.5  + 0.5);

  // wobble
  sampleA = sampleUV + sin(time/1000.0 + sampleUV.x * 24.0 + sampleUV.y * 18.0) * 0.004;
  sampleB = sampleUV + sin(time/1000.0 + sampleUV.x * 24.0 + sampleUV.y * 18.0) * 0.005;
    
  // Opacity portal effect, positive sin wave from 0.5 to 1.0.
  alpha = sin(time / 800.0);
  alpha = (alpha + 1.0) / 2.0;
  alpha = mix(0.85, 1.0, alpha);
  color = vec3(texture2D(pano, sampleB).x, texture2D(pano, sampleA).yz);
  alpha = smoothstep(0.05, 1.0, 1.6 - vDistanceToCenter);
  gl_FragColor = vec4(color, alpha);

  if (isGrayscale == 1) {
    gray = (color.r + color.g + color.b) / 3.0;
    gl_FragColor = vec4(gray, gray, gray, alpha);
  }
}
