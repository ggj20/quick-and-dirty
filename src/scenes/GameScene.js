import Phaser from 'phaser';
import Player from '../entities/Player';
import Hammer from '../entities/Hammer';
import Extinguisher from '../entities/Extinguisher';
import SolderingIron from '../entities/SolderingIron';
import PipeWrench from '../entities/PipeWrench.js';
import Leak from '../entities/Leak';
import Fire from '../entities/Fire';
import Hole from '../entities/Hole';
import Electro from '../entities/Electro';
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

    this.shipSprite = this.add.image(this.game.config.width/2, this.game.config.height/2, 'ShipSprite').setOrigin(0.5, 0.5);

    this.rooms = [
      [[275, 128], [630, 350]],
      [[1040, 128], [630, 350]],
      [[275, 605], [630, 350]],
      [[1040, 605], [630, 350]],
    ]

    this.spawnTools();

    for(let i = 0; i < this.game.settings.playerCount; i++) {
      new Player(this, this.rooms[i][0], this.rooms[i][1], i, this.toolGroup, this.damageGoup, this.zoneGroup);
    }

    //debug objects
    this.leak = new Leak(this, 500, 300);
    this.physics.world.enable(this.leak);
    this.damageGoup.add(this.leak);

    this.fire = new Fire(this, 500, 400);
    this.physics.world.enable(this.fire);
    this.damageGoup.add(this.fire);

    this.hole = new Hole(this, 500, 200);
    this.physics.world.enable(this.hole);
    this.damageGoup.add(this.hole);

    this.electro = new Electro(this, 300, 200);
    this.physics.world.enable(this.electro);
    this.damageGoup.add(this.electro);

    // Tubes
    new ItemTube(this, {x: 800, y:370}, {x: 930, y: 370}, this.zoneGroup); // Top
    new ItemTube(this, {x: 585, y: 474}, {x: 585, y: 600}, this.zoneGroup); // Left
    new ItemTube(this, {x: 1140, y: 470}, {x: 1140, y: 615}, this.zoneGroup); // Right
    new ItemTube(this, {x: 800, y: 720}, {x: 930, y: 720}, this.zoneGroup); // Bottom


    this.spawnRandomDamage()
  }

  update() {
    
  }

  spawnRandomDamage(){
    // todo select player
    //chance manipulate possibility to spawn specific effect dependant to already spawned effects
    //detect  damage to spawn
    var damageIndicator = Math.floor(Math.random() * 4); 
    //damageIndicator = 0; //DEBUG
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
    if(mapAreas.pipeAreas.length == 0) {
      this.spawnRandomDamage();
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.pipeAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.pipeAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.pipeAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].yLength); 

    var leak = new Leak(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnElectricityDamage(){
    if(mapAreas.electricityAreas.length == 0) {
      this.spawnRandomDamage();
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.electricityAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.electricityAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.electricityAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.electricityAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.electricityAreas[areaSelector].yLength); 

    var leak = new Electro(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnHoleDamage(){
    if(mapAreas.holeAreas.length == 0) {
      this.spawnRandomDamage();
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.holeAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.holeAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.holeAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].yLength); 

    var leak = new Hole(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnFIreDamage(){
    if(mapAreas.fireAreas.length == 0) {
      this.spawnRandomDamage();
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.fireAreas.length); 
    // cooridnate selector
    var xCoordinate =  mapAreas.fireAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].xLength); 
    var yCoordinate =  mapAreas.fireAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].yLength); 

    var leak = new Fire(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    this.damageGoup.add(leak);
  }

  spawnTools() {
    this.hammer = new Hammer(this, 400, 400);
    this.toolGroup.add(this.hammer)
    this.physics.world.enable(this.hammer);

    this.extinguisher = new Extinguisher(this, 300, 400);
    this.toolGroup.add(this.extinguisher)
    this.physics.world.enable(this.extinguisher);

    this.pipeWrench = new PipeWrench(this, 400, 400);
    this.toolGroup.add(this.pipeWrench)
    this.physics.world.enable(this.pipeWrench);

    this.solderingIron = new SolderingIron(this, 400, 400);
    this.toolGroup.add(this.solderingIron)
    this.physics.world.enable(this.solderingIron);
  }

}

export default GameScene;
