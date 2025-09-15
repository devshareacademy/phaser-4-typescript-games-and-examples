#define SHADER_NAME NOISE_POST_FX

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uMainSampler;
// coordinate from the vertex shader
varying vec2 outTexCoord;
// custom gradient texture
uniform sampler2D uNoise;
// for scaling the texture
uniform float uScale;
// for blending the texture
uniform float uBlend;

void main() {
  vec4 base = texture2D(uMainSampler, outTexCoord);
  vec4 noise = texture2D(uNoise, outTexCoord * uScale);
  gl_FragColor = mix(base, noise, uBlend);
}
