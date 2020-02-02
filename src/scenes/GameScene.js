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
import SteamEngine from '../entities/SteamEngine';
import mapAreas from './MapConfig';
import CoalDispenser from '../entities/CoalDispenser';
import EngineFlame from '../entities/EngineFlame';

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
    this.cameras.main.setBackgroundColor('#FFF');
    this.damageGoup = this.add.group();
    this.toolGroup = this.add.group();
    this.zoneGroup = this.add.group();
    this.playerGroup = this.add.group()

    this.shipSprite = this.add.image(this.game.config.width/2, this.game.config.height/2, 'ShipSprite').setOrigin(0.5, 0.5);

    this.rooms = [
      [[275, 128], [630, 350]],
      [[1040, 128], [630, 350]],
      [[275, 605], [630, 350]],
      [[1040, 605], [630, 350]],
    ]


    for(let i = 0; i < this.game.settings.playerCount; i++) {
    let emitter = this.createRunningEmitter();
      let player = new Player(this, this.rooms[i][0], this.rooms[i][1], i, this.toolGroup, this.damageGoup, this.zoneGroup, emitter);
      this.playerGroup.add(player);
    }
    this.physics.add.collider(this.playerGroup, this. damageGoup);

    // Engine Flames
    new EngineFlame(this, 110, 400);
    new EngineFlame(this, 110, 685);

    // Tubes
    new ItemTube(this, {x: 880, y:300}, {x: 1065, y: 300}, this.zoneGroup); // Top
    new ItemTube(this, {x: 590, y: 450}, {x: 590, y: 630}, this.zoneGroup); // Left
    new ItemTube(this, {x: 1355, y: 450}, {x: 1355, y: 630}, this.zoneGroup); // Right
    new ItemTube(this, {x: 880, y: 775}, {x: 1065, y: 775}, this.zoneGroup); // Bottom

    // Steam Engine
    new SteamEngine(this, this.zoneGroup);

    // Coal Dispensers
    new CoalDispenser(this, 1630, 160, this.toolGroup);
    new CoalDispenser(this, 1630, 920, this.toolGroup);

    setTimeout(this.spawnRandomDamage(this.game.settings.damageSpawnDelayInitial), this.game.settings.damageSpawnDelayInitial);
    this.spawnTools();
    this.createScoreText();
    this.spawnDebugStuff();
    this.setUpCamera();
  }

  createScoreText() {
    this.scoreText =  this.make.text({
      x: -80,
      y: 20,
      text: "Score: ",
      style: { font: "40px Arial", color: "#999", align: "center"},
      origin: { x: 0, y: 0.5 },
      add: true
    });
    this.scoreText.setShadow(3, 3, "#333333", 2, true, true);
  }

  setUpCamera() {
    const fadeTime = 6000;
    this.cameras.main.setZoom(0.4);
    this.cameras.main.zoomTo(1.0, fadeTime);
    this.cameras.main.pan(this.game.config.width/2 -100, this.game.config.height/2, fadeTime);
  }

  spawnDebugStuff() {
    if(this.game.settings.debug == false) {
      return;
    }

    this.leak = new Leak(this, 400, 200);
    this.physics.world.enable(this.leak);
    this.leak.body.setImmovable();
    this.damageGoup.add(this.leak);
    new PipeWrench(this, 400, 300, this.toolGroup);

    this.fire = new Fire(this, 500, 200);
    this.physics.world.enable(this.fire);
    this.fire.body.setImmovable();
    this.damageGoup.add(this.fire);
    new Extinguisher(this, 500, 300, this.toolGroup);

    this.hole = new Hole(this, 600, 200);
    this.physics.world.enable(this.hole);
    this.hole.body.setImmovable();
    this.damageGoup.add(this.hole);
    new Hammer(this, 600, 300, this.toolGroup);

    this.electro = new Electro(this, 700, 200);
    this.physics.world.enable(this.electro);
    this.electro.body.setImmovable();
    this.damageGoup.add(this.electro);
    new SolderingIron(this, 700, 300, this.toolGroup);

    new CoalDispenser(this, 300, 200, this.toolGroup);
}

  spawnRandomDamage(timer) {
    console.log("added damage: "+timer);
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
        break;
    }
    console.log(this.game.settings.difficulity)
    timer = Math.max(timer/this.game.settings.difficulity, this.game.settings.damageSpawnDelayMin);
    setTimeout(() => this.spawnRandomDamage(timer), timer);
  }

  spawnPipeDamage(){
    if(mapAreas.pipeAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.pipeAreas.length);
    // cooridnate selector
    var xCoordinate =  mapAreas.pipeAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].xLength);
    var yCoordinate =  mapAreas.pipeAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].yLength);

    var leak = new Leak(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    leak.body.setImmovable();
    this.damageGoup.add(leak);
  }

  spawnElectricityDamage(){
    if(mapAreas.electricityAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.electricityAreas.length);
    // cooridnate selector
    var xCoordinate =  mapAreas.electricityAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.electricityAreas[areaSelector].xLength);
    var yCoordinate =  mapAreas.electricityAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.electricityAreas[areaSelector].yLength);

    var leak = new Electro(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    leak.body.setImmovable();
    this.damageGoup.add(leak);
  }

  spawnHoleDamage(){
    if(mapAreas.holeAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.holeAreas.length);
    // cooridnate selector
    var xCoordinate =  mapAreas.holeAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].xLength);
    var yCoordinate =  mapAreas.holeAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].yLength);

    var leak = new Hole(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    leak.body.setImmovable();
    this.damageGoup.add(leak);
  }

  spawnFIreDamage(){
    if(mapAreas.fireAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.fireAreas.length);
    // cooridnate selector
    var xCoordinate =  mapAreas.fireAreas[areaSelector].xSource + Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].xLength);
    var yCoordinate =  mapAreas.fireAreas[areaSelector].ySource + Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].yLength);

    var leak = new Fire(this, xCoordinate, yCoordinate);
    this.physics.world.enable(leak);
    leak.body.setImmovable();
    this.damageGoup.add(leak);
  }

  getRandomPlayer() {
    return this.playerGroup.children.entries[Math.floor(Math.random() * this.playerGroup.children.entries.length)];
  }

  spawnTools() {
    let p = null;
    p = this.getRandomPlayer();
    new Hammer(this, p.x, p.y+100, this.toolGroup);
    p = this.getRandomPlayer();
    new Extinguisher(this, p.x, p.y+100, this.toolGroup);
    p = this.getRandomPlayer();
    new PipeWrench(this, p.x, p.y+100, this.toolGroup);
    p = this.getRandomPlayer();
    new SolderingIron(this, p.x, p.y+100, this.toolGroup);
  }

  createRunningEmitter() {
	  return this.add.particles('SteamParticle').createEmitter({
		  x: 0,
		  y: 0,
          speed: { min: 0, max: 0 },
          angle: { min: 0, max: 0 },
          scale: { start: 0.6, end: 0.1 },
          blendMode: 'NORMAL',
          frequency: -1,
          active: true,
          lifespan: 1500,
          tint: 0xDDDDDD,
	  });
  }

  update(time, delta) {
    this.game.state.score += 0.0001 * delta * this.game.state.speed;
    this.scoreText.setText("Score: " + Math.round(this.game.state.score));
  }
}

export default GameScene;
