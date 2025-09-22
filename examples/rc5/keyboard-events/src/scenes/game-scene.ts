import * as Phaser from 'phaser';
import { SCENE_KEYS } from '../common';

export class GameScene extends Phaser.Scene {
  #spaceKey!: Phaser.Input.Keyboard.Key;
  #cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  #comboKeys!: Phaser.Input.Keyboard.KeyCombo;
  #lastComboProgress: number;
  #keyboardSpriteMap: { [key: string]: Phaser.GameObjects.Sprite };
  #keyboardComboSpriteMap: { [key: string]: Phaser.GameObjects.Sprite };

  constructor() {
    super({ key: SCENE_KEYS.GAME_SCENE });
    this.#keyboardSpriteMap = {};
    this.#keyboardComboSpriteMap = {};
    this.#lastComboProgress = 0;
  }

  public create(): void {
    if (!this.input.keyboard) {
      return;
    }
    this.#createKeyboardAssets();

    // // listen for any keypress, can also listen for Phaser.Input.Keyboard.Events.ANY_KEY_DOWN
    // this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
    //   console.log('Any key pressed:', event.key);
    // });
    // // listen for any keyup, can also listen for Phaser.Input.Keyboard.Events.ANY_KEY_UP
    // this.input.keyboard.on('keyup', (event: KeyboardEvent) => {
    //   console.log('Key released:', event.code);
    // });
    // // listen for single key press, can also listen for Phaser.Input.Keyboard.Events.KEY_DOWN + 'SPACE'
    // this.input.keyboard.on('keydown-SPACE', () => {
    //   console.log('Space pressed!');
    // });

    this.#spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
    this.#comboKeys = this.input.keyboard.createCombo('COMBO', { resetOnMatch: false });

    // // listen for a key combo match, can also listen for Phaser.Input.Keyboard.Events.COMBO_MATCH
    // this.input.keyboard.on('keycombomatch', () => {
    //   console.log('Combo matched: COMBO');
    // });
  }

  update(): void {
    this.#handleKeyComboProgressUpdate();
    // if (this.#spaceKey.isDown) {
    //   console.log('Holding space...');
    // }

    // if (this.#cursorKeys.left.isDown) {
    //   console.log('Left arrow pressed!');
    // }
    //console.log(this.#comboKeys.progress);
  }

  #createKeyboardAssets(): void {
    const containerYOffset = 170;
    const containerX = this.scale.width / 2;

    // create wasd key sprites
    const wasdKeyContainer = this.add.container(containerX, 50, []);
    const wKeySprite = this.add.sprite(0, 0, 'W', 0);
    const sKeySprite = this.add.sprite(wKeySprite.x, wKeySprite.y + wKeySprite.height - 4, 'S', 0);
    const aKeySprite = this.add.sprite(sKeySprite.x - sKeySprite.width, sKeySprite.y, 'A', 0);
    const dKeySprite = this.add.sprite(sKeySprite.x + sKeySprite.width, sKeySprite.y, 'D', 0);
    wasdKeyContainer.add([wKeySprite, sKeySprite, aKeySprite, dKeySprite]);
    wasdKeyContainer.setScale(4);

    this.#keyboardSpriteMap['w'] = wKeySprite;
    this.#keyboardSpriteMap['a'] = aKeySprite;
    this.#keyboardSpriteMap['s'] = sKeySprite;
    this.#keyboardSpriteMap['d'] = dKeySprite;

    // create arrow key sprites
    const arrowKeyContainer = this.add.container(containerX, wasdKeyContainer.y + containerYOffset, []);
    const upKeySprite = this.add.sprite(0, 0, 'UP', 0);
    const downKeySprite = this.add.sprite(upKeySprite.x, upKeySprite.y + upKeySprite.height - 4, 'DOWN', 0);
    const leftKeySprite = this.add.sprite(downKeySprite.x - downKeySprite.width, downKeySprite.y, 'LEFT', 0);
    const rightKeySprite = this.add.sprite(downKeySprite.x + downKeySprite.width, downKeySprite.y, 'RIGHT', 0);
    arrowKeyContainer.add([upKeySprite, downKeySprite, leftKeySprite, rightKeySprite]);
    arrowKeyContainer.setScale(4);

    this.#keyboardSpriteMap['ArrowUp'] = upKeySprite;
    this.#keyboardSpriteMap['ArrowDown'] = downKeySprite;
    this.#keyboardSpriteMap['ArrowLeft'] = leftKeySprite;
    this.#keyboardSpriteMap['ArrowRight'] = rightKeySprite;

    // create space key sprite
    const spaceKeySprite = this.add.sprite(containerX, arrowKeyContainer.y + containerYOffset, 'SPACE', 0).setScale(4);
    this.#keyboardSpriteMap[' '] = spaceKeySprite;

    // create combo key sprites
    const comboKeyContainer = this.add.container(containerX, spaceKeySprite.y + 120, []);
    const mKeySprite = this.add.sprite(0, 0, 'M', 0);
    const oKeySprite = this.add.sprite(mKeySprite.x - mKeySprite.width, 0, 'O', 0);
    const cKeySprite = this.add.sprite(oKeySprite.x - oKeySprite.width, 0, 'C', 0);
    const bKeySprite = this.add.sprite(mKeySprite.x + mKeySprite.width, 0, 'B', 0);
    const o2KeySprite = this.add.sprite(bKeySprite.x + bKeySprite.width, 0, 'O', 0);
    comboKeyContainer.add([cKeySprite, oKeySprite, mKeySprite, bKeySprite, o2KeySprite]);
    comboKeyContainer.setScale(4);

    this.#keyboardComboSpriteMap['c'] = cKeySprite;
    this.#keyboardComboSpriteMap['o'] = oKeySprite;
    this.#keyboardComboSpriteMap['m'] = mKeySprite;
    this.#keyboardComboSpriteMap['b'] = bKeySprite;
    this.#keyboardComboSpriteMap['o2'] = o2KeySprite;

    if (!this.input.keyboard) {
      return;
    }

    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event: KeyboardEvent) => {
      this.#updateKeySprite(event.key, true);
    });
    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, (event: KeyboardEvent) => {
      this.#updateKeySprite(event.key, false);
    });
    this.input.keyboard.on(Phaser.Input.Keyboard.Events.COMBO_MATCH, () => {
      this.cameras.main.shake(200, 0.01);
      this.cameras.main.flash();
    });
  }

  #updateKeySprite(key: string, isKeyDown: boolean): void {
    if (this.#keyboardSpriteMap[key] === undefined) {
      return;
    }
    this.#keyboardSpriteMap[key].setFrame(isKeyDown ? 1 : 0);
  }

  #handleKeyComboProgressUpdate(): void {
    if (this.#lastComboProgress === this.#comboKeys.progress) {
      return;
    }
    this.#lastComboProgress = this.#comboKeys.progress;
    Object.keys(this.#keyboardComboSpriteMap).forEach((key) => {
      this.#keyboardComboSpriteMap[key].setFrame(0);
    });
    if (this.#comboKeys.progress === 0) {
      return;
    }
    if (this.#comboKeys.progress === 1) {
      this.#keyboardComboSpriteMap['o2'].setFrame(1);
    }
    if (this.#comboKeys.progress >= 0.8) {
      this.#keyboardComboSpriteMap['b'].setFrame(1);
    }
    if (this.#comboKeys.progress >= 0.6) {
      this.#keyboardComboSpriteMap['m'].setFrame(1);
    }
    if (this.#comboKeys.progress >= 0.4) {
      this.#keyboardComboSpriteMap['o'].setFrame(1);
    }
    this.#keyboardComboSpriteMap['c'].setFrame(1);
  }
}
