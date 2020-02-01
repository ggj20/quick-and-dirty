import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';

var settings = {
  playerSpeed: 0.1,
  playerCount: 4,
  debug: true,
};

var config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  height: 1080,
  backgroundColor: '#FFF',
  physics: {
    default: 'arcade',
    arcade: {
      debug: settings.debug,
    }
  },
  input: {
    gamepad: true
  },
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    GameOverScene,
  ]
};

var game = new Phaser.Game(config);
game.settings = settings;
