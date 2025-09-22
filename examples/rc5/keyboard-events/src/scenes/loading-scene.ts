import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.LOADING_SCENE });
  }

  preload(): void {
    this.load.pack(ASSET_KEYS.ASSET_PACK, 'assets/asset-pack.json');
  }

  create(): void {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
