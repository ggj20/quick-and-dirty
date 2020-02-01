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
    this.damageGoup = this.add.group();
    this.toolGroup = this.add.group();
 
    new Player(this, 100, 100, 0, this.toolGroup, this.damageGoup);
    new Player(this, 100, 100, 1, this.toolGroup, this.damageGoup);

    //debug objects
    this.hammer = new Hammer(this, 200, 200,'HammerSprite');
    this.toolGroup.add(this.hammer)
    this.physics.world.enable(this.hammer);
    this.leak = new Leak(this, 220, 220,'LeakSprite');
    this.physics.world.enable(this.leak);
    this.damageGoup.add(this.leak);
  }
}

export default GameScene;
