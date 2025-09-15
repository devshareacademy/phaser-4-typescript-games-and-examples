import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GAME_SCENE });
  }

  public create(): void {
    if (!this.input.keyboard) {
      return;
    }
    this.#setupLevelAssets();
    this.#createAlienSprites();
  }

  #createAlienSprites(): void {
    const flyingAlien = this.add
      .sprite(this.scale.width + 100, 20, ASSET_KEYS.ALIEN_FLYING_IDLE, 0)
      .setOrigin(0)
      .play(ASSET_KEYS.ALIEN_FLYING_IDLE);

    this.tweens.add({
      targets: flyingAlien,
      x: -100,
      yoyo: false,
      repeat: -1,
      duration: 4000,
    });

    const walkingAlien = this.add.sprite(this.scale.width - 60, 84, ASSET_KEYS.ALIEN_GROUND_IDLE, 0).setOrigin(0);
    this.#startWalkingAlienAnimation(walkingAlien, true);
  }

  #startWalkingAlienAnimation(gameObject: Phaser.GameObjects.Sprite, isLeftDirection: boolean): void {
    // play idle animation while waiting
    gameObject.play(ASSET_KEYS.ALIEN_GROUND_IDLE);
    // after waiting a set period of time, walk to another location
    this.time.delayedCall(1500, () => {
      gameObject.setFlipX(!isLeftDirection);
      gameObject.play(ASSET_KEYS.ALIEN_GROUND_WALK);
      this.tweens.add({
        targets: gameObject,
        x: isLeftDirection ? 20 : this.scale.width - 60,
        duration: 2000,
        onComplete: () => {
          // repeat by walking back to original location
          this.#startWalkingAlienAnimation(gameObject, !isLeftDirection);
        },
      });
    });
  }

  #setupLevelAssets(): void {
    this.add.image(0, 0, ASSET_KEYS.BACKGROUND, 0).setOrigin(0);
    this.add.image(0, 0, ASSET_KEYS.FOREGROUND, 0).setOrigin(0);
    this.add.image(0, 0, ASSET_KEYS.PLATFORM, 0).setOrigin(0);
  }
}
