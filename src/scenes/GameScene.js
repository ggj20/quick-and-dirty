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

    this.shipSprite = this.add.image(this.game.config.width/2, this.game.config.height/2, 'ShipSprite').setOrigin(0.5, 0.5);


    new Player(this, [330, 180], [500, 320], 0, this.toolGroup, this.damageGoup, this.zoneGroup);
    //new Player(this, [905, 180], [500, 320], 1, this.toolGroup, this.damageGoup, this.zoneGroup);
    //new Player(this, [330, 565], [500, 320], 2, this.toolGroup, this.damageGoup, this.zoneGroup);
	//new Player(this, [905, 565], [500, 320], 3, this.toolGroup, this.damageGoup, this.zoneGroup);


    //debug objects
    this.hammer = new Hammer(this, 400, 400,'HammerSprite');
    this.toolGroup.add(this.hammer)
    this.physics.world.enable(this.hammer);
    this.leak = new Leak(this, 500, 300,'LeakSprite');
    this.physics.world.enable(this.leak);
    this.damageGoup.add(this.leak);

    // Tubes
    new ItemTube(this, {x: 800, y:370}, {x: 930, y: 370}, this.zoneGroup); // Top
    new ItemTube(this, {x: 585, y: 474}, {x: 585, y: 600}, this.zoneGroup); // Left
    new ItemTube(this, {x: 1140, y: 470}, {x: 1140, y: 615}, this.zoneGroup); // Right
    new ItemTube(this, {x: 800, y: 720}, {x: 930, y: 720}, this.zoneGroup); // Bottom
  }
}

export default GameScene;
