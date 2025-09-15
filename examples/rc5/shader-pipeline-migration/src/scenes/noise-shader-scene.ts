import Phaser from 'phaser';
import { Pane } from 'tweakpane';
import { NoiseShader, NoiseShaderController } from '../shaders/noise-shader';

const IMAGE_ASSET_KEY = 'BG';
const SHADER_ASSET_KEY = 'NOISE';

export class NoiseShaderScene extends Phaser.Scene {
  #pane!: Pane;
  #noiseController!: NoiseShaderController;

  constructor() {
    super({ key: 'NoiseShaderScene' });
  }

  preload(): void {
    // load in data
    this.load.image(IMAGE_ASSET_KEY, 'assets/images/bg.png');
    this.load.image(SHADER_ASSET_KEY, 'assets/images/noise.png');

    this.load.glsl('noise', 'assets/shader/noise.frag');
  }

  create(): void {
    // Create game objects
    this.add.image(0, 0, IMAGE_ASSET_KEY).setOrigin(0);

    const renderer = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    if (!renderer.renderNodes.hasNode('Noise')) {
      renderer.renderNodes.addNodeConstructor('Noise', NoiseShader);
    }
    this.#noiseController = new NoiseShaderController(this.cameras.main);
    this.cameras.main.filters.external.add(this.#noiseController);

    this.#createPane();

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('GreyScaleShaderScene');
    });

    this.events.once(
      Phaser.Scenes.Events.SHUTDOWN,
      () => {
        this.shutdown();
      },
      this,
    );
  }

  #createPane(): void {
    this.#pane = new Pane();

    this.#pane.addBinding(this.#noiseController, 'scale', {
      min: 0.1,
      max: 10.0,
    });
    this.#pane.addBinding(this.#noiseController, 'blend', {
      min: 0.0,
      max: 1.0,
    });
  }

  shutdown(): void {
    if (this.#pane) {
      this.#pane.dispose();
    }
  }
}
