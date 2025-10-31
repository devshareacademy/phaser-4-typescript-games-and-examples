import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GAME_SCENE });
  }

  public create(): void {
    //this.#createMagicCircle1();
    //this.#createMagicCircle2();
    //this.#createMagicCircle2Alt();
    //this.#createMagicCircle3();
  }

  // play animation from sprite sheet that is multi rows
  #createMagicCircle1(): void {
    const asset = ASSET_KEYS.MAGIC_1;
    const { width, height } = this.scale;
    const magic = this.add.sprite(width / 2, height / 2, asset, 0).play(asset);
    magic.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.add.tween({
        targets: magic,
        duration: 600,
        alpha: 0,
        onComplete: () => {
          this.scene.restart();
        },
      });
    });
  }

  // play animation from sprite sheet with multi rows with empty spacing
  #createMagicCircle2(): void {
    const asset = ASSET_KEYS.MAGIC_2;
    const { width, height } = this.scale;
    const magic = this.add.sprite(width / 2, height / 2, asset, 0).play(asset);
    magic.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.add.tween({
        targets: magic,
        duration: 600,
        alpha: 0,
        onComplete: () => {
          this.scene.restart();
        },
      });
    });
  }

  // play animation from sprite sheet that has multiple animations and empty spacing
  #createMagicCircle2Alt(): void {
    const asset = ASSET_KEYS.MAGIC_2;
    const { width, height } = this.scale;
    const magic = this.add.sprite(width / 2, height / 2, asset, 0).play(`${asset}_A`);
    magic.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.time.delayedCall(1000, () => {
        magic.play(`${asset}_B`);
        magic.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.add.tween({
            targets: magic,
            duration: 600,
            alpha: 0,
            onComplete: () => {
              this.scene.restart();
            },
          });
        });
      });
    });
  }

  // play animation from sprites defined in atlas file
  #createMagicCircle3(): void {
    const asset = ASSET_KEYS.MAGIC_3;
    const { width, height } = this.scale;
    const magic = this.add.sprite(width / 2, height / 2, asset, 0).play(asset);
    magic.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.add.tween({
        targets: magic,
        duration: 600,
        alpha: 0,
        onComplete: () => {
          this.scene.restart();
        },
      });
    });
  }
}
