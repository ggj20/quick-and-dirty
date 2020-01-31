import Phaser from 'phaser';
import Player from '../entities/Player';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    })
  }

  preload() {
    console.log('loading game');
  }

  create() {
    new Player(this, 100, 100, 0);
    new Player(this, 100, 100, 1);
  }
}

export default GameScene;
