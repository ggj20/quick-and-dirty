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
    new Hammer(this, 200, 200,'HammerSprite');
    new Player(this, 100, 100, 0);
    new Player(this, 100, 100, 1);
  }
}

export default GameScene;
