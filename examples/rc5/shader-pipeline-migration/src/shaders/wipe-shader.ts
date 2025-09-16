// in this example, we load our shader from external file

// In Phaser 3, we created a custom PostFXPipeline instance
/*
export class WipePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  #progress: number;

  constructor(game: Phaser.Game) {
    super({
      game,
      fragShader: frag,
    });
    this.#progress = 0;
  }

  get progress(): number {
    return this.#progress;
  }

  set progress(val: number) {
    this.#progress = val;
  }

  onPreRender() {
    this.set1f('uCutoff', this.#progress);
  }
}
*/

// In Phaser 4, we need to create a filter, which is how we can add custom shaders to our game. The filter consists of two parts:
// a Controller and RenderNode.

// In Phaser 4, the RenderNode, or BaseFilterShader, is what gets added to the Phaser Renderer, and contains the shader code we
// want to run.
export class WipeShader extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
  constructor(manager: Phaser.Renderer.WebGL.RenderNodes.RenderNodeManager) {
    // here, we can load our shader from our cache by using the same cache key from when we loaded the frag file in our preload method
    super('Wipe', manager, 'wipe');
  }

  // In Phaser 4, to pass uniforms to our shader program, we can implement the `setupUniforms` method.
  // This method relies on the unique values that have been set on the controller associated with this
  // RenderNode.
  // In Phaser 3, this would be similar to the logic that was set in the `onPreRender` method
  public setupUniforms(controller: WipeShaderController) {
    const programManager = this.programManager;
    programManager.setUniform('uCutoff', controller.progress);
  }
}

// In Phaser 4, the Controller, is how we can 'control' the effects of a filter/shader, and each game object/camera should
// have their own controller instance. This is how we can apply the same shader to multiple game objects, but then pass different
// parameters/uniform values to each instance.

// In this example, previously in our custom PostFXPipeline, we had custom properties on the PostFXPipeline instance
// which were being passed as uniform values to our shader program. In Phaser 4, we will now pass those values
// here on the controller class, and the values will be retrieved from the BaseFilterShader class when the renderer
// runs our shader.
export class WipeShaderController extends Phaser.Filters.Controller {
  #progress: number;

  constructor(camera: Phaser.Cameras.Scene2D.Camera) {
    // pass the unique id of the render node we want to use for this controller
    // should match the name we provided in our BaseFilterShader custom class above
    super(camera, 'Wipe');
    this.#progress = 0;
  }

  get progress(): number {
    return this.#progress;
  }

  set progress(val: number) {
    this.#progress = val;
  }
}
