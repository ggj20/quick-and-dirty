import Phaser from 'phaser';
import Player from '../entities/Player';
import Hammer from '../entities/Hammer';
import Leak from '../entities/Leak';
import ItemTube from '../entities/ItemTube';
import mapAreas from './MapConfig';

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

    this.shipSprite = this.add.image(0, 0, 'ShipSprite').setOrigin(0, 0);

    for(let i = 0; i < this.game.settings.playerCount; i++) {
      new Player(this, [200, 200], [500, 500], i, this.toolGroup, this.damageGoup, this.zoneGroup);
    }

    //debug objects
    this.hammer = new Hammer(this, 200, 200,'HammerSprite');
    this.toolGroup.add(this.hammer)
    this.physics.world.enable(this.hammer);
    this.leak = new Leak(this, 220, 220,'LeakSprite');
    this.physics.world.enable(this.leak);
    this.damageGoup.add(this.leak);

    // Tubes
    new ItemTube(this, {x: 800, y:370}, {x: 930, y: 370}, this.zoneGroup); // Top
    new ItemTube(this, {x: 585, y: 474}, {x: 585, y: 600}, this.zoneGroup); // Left
    new ItemTube(this, {x: 1140, y: 470}, {x: 1140, y: 615}, this.zoneGroup); // Right
    new ItemTube(this, {x: 800, y: 720}, {x: 930, y: 720}, this.zoneGroup); // Bottom


    this.spawnRandomDamage()
  }

  spawnRandomDamage(){
    // todo select player
    //chance manipulate possibility to spawn specific effect dependant to already spawned effects
    //detect  damage to spawn
    var damageIndicator = Math.floor(Math.random() * 4); 
    switch(damageIndicator) {
      case 0:
          this.spawnPipeDamage();
        break;
      case 1:
        this.spawnElectricityDamage();
        break;
      case 2:
        this.spawnHoleDamage();
        break;
      case 3:
        this.spawnFIreDamage();
        break
    }
  }

  spawnPipeDamage(){
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.pipeAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.pipeAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.pipeAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].yLength); 

    var leak = new Leak(this, xCoordinate, yCoordinate,'LeakSprite');
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnElectricityDamage(){
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.electricityAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.electricityAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.electricityAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.electricityAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.electricityAreas[areaSelector].yLength); 

    var leak = new Leak(this, xCoordinate, yCoordinate,'LeakSprite');
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnHoleDamage(){
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.holeAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.holeAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.holeAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].yLength); 

    var leak = new Leak(this, xCoordinate, yCoordinate,'LeakSprite');
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnFIreDamage(){
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.fireAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.fireAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.fireAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].yLength); 

    var leak = new Leak(this, xCoordinate, yCoordinate,'LeakSprite');
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

}

export default GameScene;
