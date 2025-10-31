import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.LOADING_SCENE });
  }

  preload(): void {
    this.load.setPath('assets');
    this.#loadSpriteSheets();
  }

  create(): void {
    this.#createAnimations();
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }

  #loadSpriteSheets(): void {
    // load spritesheet that contains the frames that make up the character animations
    // each frame should be the same width and height, and we need to specify that
    // in the configuration
    this.load.spritesheet(ASSET_KEYS.MAGIC_1, 'magic-1.png', {
      frameWidth: 480,
      frameHeight: 480,
    });
    this.load.spritesheet(ASSET_KEYS.MAGIC_2, 'magic-2.png', {
      frameWidth: 480,
      frameHeight: 480,
    });
    this.load.atlas(ASSET_KEYS.MAGIC_3, 'magic-3.png', 'magic-3.json');
  }

  #createAnimations(): void {
    this.anims.create({
      key: ASSET_KEYS.MAGIC_1,
      frames: this.anims.generateFrameNumbers(ASSET_KEYS.MAGIC_1),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: `${ASSET_KEYS.MAGIC_2}_A`,
      frames: this.anims.generateFrameNumbers(ASSET_KEYS.MAGIC_2, {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: `${ASSET_KEYS.MAGIC_2}_B`,
      frames: this.anims.generateFrameNumbers(ASSET_KEYS.MAGIC_2, {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // for sprite sheets we can rely on generateFrameNumbers since the frames will be sequential
    // we can also use generateFrameNames, and just omit the prefix and suffix fields
    this.anims.create({
      key: ASSET_KEYS.MAGIC_2,
      frames: this.anims.generateFrameNumbers(ASSET_KEYS.MAGIC_2, {
        frames: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15],
      }),
      frameRate: 10,
      repeat: 0,
    });

    // for animations with names we can use generateFrameNames to parse the frames
    // this is common for things like atlas files
    this.anims.create({
      key: ASSET_KEYS.MAGIC_3,
      frames: this.anims.generateFrameNames(ASSET_KEYS.MAGIC_3, {
        prefix: 'tile_',
        suffix: '.png',
        start: 0,
        end: 14,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }
}
