import Phaser from 'phaser';
import Player from '../entities/Player';
import Hammer from '../entities/Hammer';

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
    new Player(this, 100, 100);
    new Hammer(this, 200, 200,'hammer');
  }
}

export default GameScene;
