import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.LOADING_SCENE });
  }

  preload(): void {
    this.load.setPath('assets');
    this.#loadImages();
    this.#loadSpriteSheets();
  }

  create(): void {
    this.#createAnimations();
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }

  #loadImages(): void {
    this.load.image(ASSET_KEYS.BACKGROUND, 'background.png');
    this.load.image(ASSET_KEYS.FOREGROUND, 'back-structures.png');
    this.load.image(ASSET_KEYS.PLATFORM, 'platform.png');
  }

  #loadSpriteSheets(): void {
    // load spritesheet that contains the frames that make up the character animations
    // each frame should be the same width and height, and we need to specify that
    // in the configuration
    this.load.spritesheet(ASSET_KEYS.ALIEN_FLYING_IDLE, 'alien-flying.png', {
      frameWidth: 83,
      frameHeight: 64,
    });
    this.load.spritesheet(ASSET_KEYS.ALIEN_GROUND_IDLE, 'alien-enemy-idle.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet(ASSET_KEYS.ALIEN_GROUND_WALK, 'alien-enemy-walk.png', {
      frameWidth: 57,
      frameHeight: 48,
    });
  }

  #createAnimations(): void {
    // for each unique animation, we need to give that animation a unique name
    // and provide a configuration that makes up that animation (the frames, frame rate, repeat, etc)
    // for an animation, we need to use the built in utils to create our frame objects for the animation
    const alienFlyingFrames = this.anims.generateFrameNames(ASSET_KEYS.ALIEN_FLYING_IDLE);
    // note ^, when a spritesheet only has the frames for a single animation, we can omit which frames to use
    this.anims.create({
      key: ASSET_KEYS.ALIEN_FLYING_IDLE,
      frames: alienFlyingFrames,
      frameRate: 14,
      repeat: -1,
      yoyo: false,
    });

    // we can also specify which frames to use from that spritesheet
    const alienGroundIdleFrames = this.anims.generateFrameNames(ASSET_KEYS.ALIEN_GROUND_IDLE, {
      frames: [0, 1, 2, 3],
    });
    this.anims.create({
      key: ASSET_KEYS.ALIEN_GROUND_IDLE,
      frames: alienGroundIdleFrames,
      frameRate: 6,
      repeat: -1,
      yoyo: false,
    });

    // we can also specify the start and end frames for the animation
    const alienGroundWalkingFrames = this.anims.generateFrameNames(ASSET_KEYS.ALIEN_GROUND_WALK, {
      start: 0,
      end: 5,
    });
    this.anims.create({
      key: ASSET_KEYS.ALIEN_GROUND_WALK,
      frames: alienGroundWalkingFrames,
      frameRate: 12,
      repeat: -1,
      yoyo: false,
    });
  }
}
