import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';

var settings = {
  playerSpeed: 70,
  playerCount: 4,
  coalSpawnDelay: 5000,
  damageSpawnDelayInitial: 10000,
  damageSpawnDelayMin: 1000,
  debug: true,
  difficulity: 1.1,
  maxShipSpeed: 100,
  engineTemperaturePerCoalDrop: 1,
  engineTemperatureDecreaseFactor: 0.35 / 10000,
  engineTemperatureOptimal: 4,
  engineTemperatureMaximum: 5,
  heightChange: 10 / 1000,
  fireSpreadChance: 0.2
  voltageChange: 10 / 1000,
};

var gameState = {
  score: 0,
  height: 100,
  speed: 0,
  engineTemperature: 3,
  engineEfficency: 0.75,
  voltage: 100,
};

var config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  height: 1080,
  backgroundColor: '#333',
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
game.state = gameState;
