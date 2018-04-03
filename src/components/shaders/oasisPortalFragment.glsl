#define RECIPROCAL_PI2 0.15915494
uniform float time;
uniform int isGrayscale;
uniform sampler2D pano;
uniform vec3 backgroundColor;
uniform vec3 strokeColor;
varying float vDistance;
varying float vDistanceToCenter;
varying vec3 vWorldPosition;

void main() {
  float alpha;
  float gray;
  vec3 color;
  vec3 direction = normalize(vWorldPosition - cameraPosition);
  vec2 sampleUV;

  float borderThickness = 0.94;

  sampleUV.x = atan(direction.z, -direction.x) * -RECIPROCAL_PI2 + 0.5;
  sampleUV.y = saturate(direction.y * 0.5  + 0.5);

  // TODO: Get rid of branching.
  if (vDistanceToCenter > borderThickness) {
    gl_FragColor = vec4(strokeColor, 1.0);
  } else {
    // Opacity portal effect, positive sin wave from 0.5 to 1.0.
    alpha = sin(time / 800.0);
    alpha = (alpha + 1.0) / 2.0;
    alpha = mix(0.85, 1.0, alpha);
    color = texture2D(pano, sampleUV).xyz;
    gl_FragColor = vec4(color, alpha);

    if (isGrayscale == 1) {
      gray = (color.r + color.g + color.b) / 3.0;
      gl_FragColor = vec4(gray, gray, gray, alpha);
    }
  }
}
