const frag = `
#define SHADER_NAME GREY_SCALE_POST_TINT

#ifdef GL_ES
precision mediump float;
#endif

// coordinate from the vertex shader
varying vec2 outTexCoord;
uniform sampler2D uMainSampler;

void main() {
  gl_FragColor = texture2D(uMainSampler, outTexCoord);
  // mix https://thebookofshaders.com/glossary/?search=mix
  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), 1.0);
}
`;

// In Phaser 3, we created a custom PostFXPipeline instance
/*
export class GreyScalePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game: Phaser.Game) {
    super({
      game,
      fragShader: frag,
    });
  }
}
*/

// In Phaser 4, we need to create a filter, which is how we can add custom shaders to our game. The filter consists of two parts:
// a Controller and RenderNode.

// In Phaser 4, the RenderNode, or BaseFilterShader, is what gets added to the Phaser Renderer, and contains the shader code we
// want to run.
export class GreyScaleShader extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
  constructor(manager: Phaser.Renderer.WebGL.RenderNodes.RenderNodeManager) {
    // here, we can pass the fragment shader code directly, or load the shader code as a file and pass as the 3rd argument
    super('GreyScale', manager, undefined, frag);
  }
}

// In Phaser 4, the Controller, is how we can 'control' the effects of a filter/shader, and each game object/camera should
// have their own controller instance. This is how we can apply the same shader to multiple game objects, but then pass different
// parameters/uniform values to each instance.
export class GreyScaleShaderController extends Phaser.Filters.Controller {
  constructor(camera: Phaser.Cameras.Scene2D.Camera) {
    // pass the unique id of the render node we want to use for this controller
    // should match the name we provided in our BaseFilterShader custom class above
    super(camera, 'GreyScale');
  }
}
