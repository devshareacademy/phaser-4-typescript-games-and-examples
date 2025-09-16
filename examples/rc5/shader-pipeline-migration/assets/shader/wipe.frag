#pragma phaserTemplate(shaderName)

precision mediump float;

uniform sampler2D uMainSampler;
// coordinate from the vertex shader
varying vec2 outTexCoord;
uniform float uCutoff;

void main() {
  if (outTexCoord.x < uCutoff) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    // returns the original color of the pixel that is being processed
    gl_FragColor = texture2D(uMainSampler, outTexCoord);
  }
}
