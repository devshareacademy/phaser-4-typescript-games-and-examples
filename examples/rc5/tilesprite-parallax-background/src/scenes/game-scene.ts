import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../common';

export class GameScene extends Phaser.Scene {
  #backgroundTileSprite!: Phaser.GameObjects.TileSprite;
  #castleTileSprite!: Phaser.GameObjects.TileSprite;
  #foreground1TileSprite!: Phaser.GameObjects.TileSprite;
  #foreground2TileSprite!: Phaser.GameObjects.TileSprite;
  #fogTileSprite!: Phaser.GameObjects.TileSprite;
  #snow1TileSprite!: Phaser.GameObjects.TileSprite;
  #snow2TileSprite!: Phaser.GameObjects.TileSprite;
  #cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: SCENE_KEYS.GAME_SCENE });
  }

  public create(): void {
    if (!this.input.keyboard) {
      return;
    }
    this.#setupLevelAssets();
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  public update(): void {
    // based on camera movement (good if we want to follow object like player)
    if (this.#cursorKeys.left.isDown) {
      console.log(1);
      this.cameras.main.scrollX -= 1;
    } else if (this.#cursorKeys.right.isDown) {
      this.cameras.main.scrollX += 1;
    }
    const cameraX = this.cameras.main.scrollX;
    this.#backgroundTileSprite.tilePositionX = cameraX * 0.35;
    this.#castleTileSprite.tilePositionX = cameraX * 0.4;
    this.#foreground2TileSprite.tilePositionX = cameraX * 0.6;
    this.#foreground1TileSprite.tilePositionX = cameraX * 0.8;

    // Direct movement
    // // Distant mountains & castle – move slowly
    // this.#backgroundTileSprite.tilePositionX += 0.35;
    // this.#castleTileSprite.tilePositionX += 0.4;

    // // Closer foreground – move faster
    // this.#foreground2TileSprite.tilePositionX += 0.6;
    // this.#foreground1TileSprite.tilePositionX += 0.8;

    this.#fogTileSprite.tilePositionX -= 1;
    this.#snow2TileSprite.tilePositionY += 10;
    this.#snow1TileSprite.tilePositionY += 20;
  }

  #setupLevelAssets(): void {
    const { width, height } = this.scale;

    this.add.image(0, 0, ASSET_KEYS.SKY, 0).setOrigin(0).setScrollFactor(0);
    this.#backgroundTileSprite = this.add
      .tileSprite(0, 0, width, height, ASSET_KEYS.BACKGROUND, 0)
      .setOrigin(0)
      .setScrollFactor(0);
    this.#castleTileSprite = this.add
      .tileSprite(0, 0, width, height, ASSET_KEYS.CASTLE, 0)
      .setOrigin(0)
      .setScrollFactor(0);
    this.#fogTileSprite = this.add.tileSprite(0, 0, width, height, ASSET_KEYS.FOG, 0).setOrigin(0).setScrollFactor(0);
    this.#foreground2TileSprite = this.add
      .tileSprite(0, 0, width, height, ASSET_KEYS.FOREGROUND_2, 0)
      .setOrigin(0)
      .setScrollFactor(0);
    this.#foreground1TileSprite = this.add
      .tileSprite(0, 0, width, height, ASSET_KEYS.FOREGROUND_1, 0)
      .setOrigin(0)
      .setScrollFactor(0);

    this.#snow2TileSprite = this.add
      .tileSprite(0, -height / 2, width * 2, height * 2, ASSET_KEYS.SNOW_2, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0)
      .setRotation(90);

    this.#snow1TileSprite = this.add
      .tileSprite(0, -height / 2, width * 2, height * 2, ASSET_KEYS.SNOW_1, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0)
      .setRotation(90);
  }
}
