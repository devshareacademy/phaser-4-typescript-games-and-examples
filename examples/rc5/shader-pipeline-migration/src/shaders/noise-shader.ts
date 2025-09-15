/*
export class NoisePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  protected _gradientTexture!: Phaser.Renderer.WebGL.Wrappers.WebGLTextureWrapper;
  protected _scale: number;
  protected _blend: number;

  constructor(game: Phaser.Game) {
    super({ game, fragShader: frag });
    this._scale = 2.0;
    this._blend = 0.15;
  }

  get scale(): number {
    return this._scale;
  }

  set scale(val: number) {
    this._scale = val;
  }

  get blend(): number {
    return this._blend;
  }

  set blend(val: number) {
    this._blend = val;
  }

  onBoot(): void {
    this._gradientTexture = this.game.textures.getFrame('NOISE').glTexture;
  }

  onPreRender(): void {
    super.onPreRender();
    this.set1i('uNoise', 1);
    this.set1f('uScale', this._scale);
    this.set1f('uBlend', this._blend);
  }

  onDraw(renderTarget: Phaser.Renderer.WebGL.RenderTarget) {
    this.bindTexture(this._gradientTexture, 1);
    this.bindAndDraw(renderTarget);
  }
}
*/

export class NoiseShader extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
  constructor(manager: Phaser.Renderer.WebGL.RenderNodes.RenderNodeManager) {
    super('Noise', manager, 'noise');
  }

  public setupUniforms(controller: NoiseShaderController) {
    const programManager = this.programManager;
    programManager.setUniform('uScale', controller.scale);
    programManager.setUniform('uBlend', controller.blend);

    // to pass the additional texture to our shader program, we need to bind that uniform to one of our texture slots
    // we do that here by associating the uniform and the available slot (by default slot 0 is used by Phaser and is the original texture of the camera/game object/ etc.)
    // In Phaser 3, we did this in the `onPreRender` method.
    programManager.setUniform('uNoise', 1);
  }

  // In Phaser 4, this method allows us to pass additional textures as input to our shader program.
  // In Phaser 3, this logic happened in the `onDraw` method, and we called the `bindTexture` method like so: `this.bindTexture(this._gradientTexture, 1);`.
  // The `bindTexture` method is how we assigned the texture to a given texture slot, and in Phaser 4, we do this by adding the texture to the `textures` array that is an argument.
  public setupTextures(
    controller: NoiseShaderController,
    textures: Phaser.Renderer.WebGL.Wrappers.WebGLTextureWrapper[],
  ) {
    if (controller.noiseTexture) {
      textures[1] = controller.noiseTexture;
    }
  }
}

export class NoiseShaderController extends Phaser.Filters.Controller {
  protected _noiseTexture!: Phaser.Renderer.WebGL.Wrappers.WebGLTextureWrapper;
  protected _scale: number;
  protected _blend: number;

  constructor(camera: Phaser.Cameras.Scene2D.Camera) {
    super(camera, 'Noise');
    this._scale = 2.0;
    this._blend = 0.15;

    // get the texture we want to pass from our textures manager (asset we loaded in)
    const phaserTexture = this.camera.scene.sys.textures.getFrame('NOISE');
    if (phaserTexture) {
      this._noiseTexture = phaserTexture.glTexture;
    }
  }

  get scale(): number {
    return this._scale;
  }

  set scale(val: number) {
    this._scale = val;
  }

  get blend(): number {
    return this._blend;
  }

  set blend(val: number) {
    this._blend = val;
  }

  get noiseTexture(): Phaser.Renderer.WebGL.Wrappers.WebGLTextureWrapper | null {
    return this._noiseTexture;
  }
}
