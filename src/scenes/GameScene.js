import Phaser from 'phaser';
import Player from '../entities/Player';
import Hammer from '../entities/Hammer';
import Leak from '../entities/Leak';
import ItemTube from '../entities/ItemTube';

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
    this.zoneGroup = this.add.group();

    for(let i = 0; i < this.game.settings.playerCount; i++) {
      new Player(this, 100, 100, i, this.toolGroup, this.damageGoup, this.zoneGroup);
    }

    //debug objects
    this.hammer = new Hammer(this, 200, 200,'HammerSprite');
    this.toolGroup.add(this.hammer)
    this.physics.world.enable(this.hammer);
    this.leak = new Leak(this, 220, 220,'LeakSprite');
    this.physics.world.enable(this.leak);
    this.damageGoup.add(this.leak);
    this.tube1 = new ItemTube(this, {x: 300, y:300}, {x:800, y:800}, this.zoneGroup);
    
  }
}

export default GameScene;
