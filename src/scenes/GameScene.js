import Phaser from 'phaser';
import Player from '../entities/Player';
import Hammer from '../entities/Hammer';
import Leak from '../entities/Leak';

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
    new Leak(this, 220, 220,'LeakSprite');
    new Player(this, 100, 100, 0);
    new Player(this, 100, 100, 1);
  }
}

export default GameScene;
