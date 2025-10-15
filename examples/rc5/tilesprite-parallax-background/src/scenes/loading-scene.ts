import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.LOADING_SCENE });
  }

  preload(): void {
    this.load.setPath('assets');
    this.#loadImages();
  }

  create(): void {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }

  #loadImages(): void {
    this.load.image(ASSET_KEYS.FOREGROUND_1, '1_foreground_mts.png');
    this.load.image(ASSET_KEYS.FOREGROUND_2, '2_foreground_mts.png');
    this.load.image(ASSET_KEYS.CASTLE, '3_ice_castle.png');
    this.load.image(ASSET_KEYS.BACKGROUND, '4_BG_mts.png');
    this.load.image(ASSET_KEYS.FOG, 'fog.png');
    this.load.image(ASSET_KEYS.SKY, 'sky.png');
    this.load.image(ASSET_KEYS.SNOW_2, 'snow_2.png');
    this.load.image(ASSET_KEYS.SNOW_1, 'snow.png');
  }
}
