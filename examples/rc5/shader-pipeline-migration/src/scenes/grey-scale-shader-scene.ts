import Phaser from 'phaser';
import { GreyScaleShader, GreyScaleShaderController } from '../shaders/grey-scale-shader';

const IMAGE_ASSET_KEY = 'BG';

export class GreyScaleShaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GreyScaleShaderScene' });
  }

  preload(): void {
    // load in data
    this.load.image(IMAGE_ASSET_KEY, 'assets/images/bg.png');
  }

  create(): void {
    // Create game objects
    this.add.image(0, 0, IMAGE_ASSET_KEY).setOrigin(0);

    // example for adding shader in phaser 4
    // add rendering node to our render
    // in Phaser 3, this was adding our post pipeline to the render
    // (this.renderer as Phaser.Renderer.WebGL.WebGLRenderer).pipelines.addPostPipeline('GreyScalePostFxPipeline', GreyScalePostFxPipeline);
    // Phaser 4 version, first get the renderer and the see if this rendering node does not exist, if not add to renderer
    const renderer = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    if (!renderer.renderNodes.hasNode('GreyScale')) {
      // similar to Phaser 3 of adding a pipeline, we need to provide a unique name, and then the class we want to create an instance of
      renderer.renderNodes.addNodeConstructor('GreyScale', GreyScaleShader);
    }

    // now, we can add our shader as a filter to our game object or camera
    // in Phaser 3, this we would add this as a post pipeline like so
    // this.cameras.main.setPostPipeline(GreyScalePostFxPipeline);

    // in Phaser 4, we enable filters on the game object, create a controller for the filter, and then add that controller to the object

    // Note: for our main camera, we don't need to enable filters like we do on other game objects
    // example for enabling filters on game object: this.add.sprite(0, 0, 'key').enableFilters();

    // create a controller for the filter, for this we need to pass in the camera associated with our game object
    // for our main camera, we just pass in the camera instance
    const greyScaleController = new GreyScaleShaderController(this.cameras.main);

    // add filter controller to the main camera
    this.cameras.main.filters.external.add(greyScaleController);

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('WipeShaderScene');
    });
  }
}
