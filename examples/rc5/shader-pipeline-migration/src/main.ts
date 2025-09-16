import Phaser from 'phaser';
import { GreyScaleShaderScene } from './scenes/grey-scale-shader-scene';
import { WipeShaderScene } from './scenes/wipe-shader-scene';
import { NoiseShaderScene } from './scenes/noise-shader-scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#5c5b5b',
};

const game = new Phaser.Game(gameConfig);
game.scene.add('GreyScaleShaderScene', GreyScaleShaderScene);
game.scene.add('WipeShaderScene', WipeShaderScene);
game.scene.add('NoiseShaderScene', NoiseShaderScene);
game.scene.start('GreyScaleShaderScene');
