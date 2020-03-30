import Phaser from 'phaser';
// Configs
import mapAreas from './MapConfig';
// Entities
import Player from '../entities/Player';
import ItemTube from '../entities/ItemTube';
import SteamEngine from '../entities/SteamEngine';
import CoalDispenser from '../entities/CoalDispenser';
import EngineFlame from '../entities/EngineFlame';
import Light from '../entities/Light.js';
// Tools
import Hammer from '../tools/Hammer';
import Extinguisher from '../tools/Extinguisher';
import SolderingIron from '../tools/SolderingIron';
import PipeWrench from '../tools/PipeWrench';
// Damages
import Leak from '../damages/Leak';
import Fire from '../damages/Fire';
import Hole from '../damages/Hole';
import Electro from '../damages/Electro';
// Indicators
import AltitudeIndicator from '../indicators/AltitudeIndicator';
import Thermometer from '../indicators/Thermometer';
import VoltageMeter from '../indicators/VoltageMeter';
import WarningsIndicator from '../indicators/WarningsIndicator';
// Utils
import countDamagesByToolType from '../utils/count-damages-by-tool-type';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    console.log('game:preload');
  }

  create() {
    console.log('game:create');
    this.sound.pauseOnBlur = false;

    this.cameras.main.setBackgroundColor('#FFF');
    this.damageGoupColliding = this.add.group();
    this.damageGroupNotColliding = this.add.group();
    this.toolGroup = this.add.group();
    this.zoneGroup = this.add.group();
    this.playerGroup = this.add.group();

    this.parallaxBgForest = this.add
      .tileSprite(
        this.game.config.width / 2,
        this.game.config.height / 2,
        2880 * 3,
        1620 * 3,
        'ParallaxBgForest',
      )
      .setOrigin(0.5, 0.5);
    this.parallaxBgClouds = this.add
      .tileSprite(
        this.game.config.width / 2,
        this.game.config.height / 2,
        2880 * 3,
        1620 * 3,
        'ParallaxBgClouds',
      )
      .setOrigin(0.5, 0.5);
    this.shipSprite = this.add
      .image(
        this.game.config.width / 2,
        this.game.config.height / 2,
        'ShipSprite',
      )
      .setOrigin(0.5, 0.5);

    this.rooms = [
      [
        [275, 128],
        [630, 350],
      ],
      [
        [1040, 128],
        [630, 350],
      ],
      [
        [275, 605],
        [630, 350],
      ],
      [
        [1040, 605],
        [630, 350],
      ],
    ];

    for (let [i, player] of this.game.players.entries()) {
      let emitter = this.createRunningEmitter();
      this.playerGroup.add(
        new Player(
          this,
          this.rooms[i][0],
          this.rooms[i][1],
          i + 1,
          player.id,
          this.toolGroup,
          this.damageGoupColliding,
          this.damageGroupNotColliding,
          this.zoneGroup,
          emitter,
        ),
      );
    }
    this.physics.add.collider(this.playerGroup, this.damageGoupColliding);

    // Engine Flames
    new EngineFlame(this, 110, 400);
    new EngineFlame(this, 110, 685);

    // Tubes
    new ItemTube(this, { x: 880, y: 300 }, { x: 1065, y: 300 }, this.zoneGroup); // Top
    new ItemTube(this, { x: 590, y: 450 }, { x: 590, y: 630 }, this.zoneGroup); // Left
    new ItemTube(
      this,
      { x: 1355, y: 450 },
      { x: 1355, y: 630 },
      this.zoneGroup,
    ); // Right
    new ItemTube(this, { x: 880, y: 775 }, { x: 1065, y: 775 }, this.zoneGroup); // Bottom

    // Steam Engine
    new Thermometer(this, 136, 416, 21, 252);
    new SteamEngine(this, this.zoneGroup, this.damageGoupColliding);

    // Voltage indicator
    new VoltageMeter(this, 167, 416, 21, 252);

    // Coal Dispensers
    new CoalDispenser(this, 1630, 160, this.toolGroup);
    new CoalDispenser(this, 1630, 920, this.toolGroup);

    setTimeout(
      this.spawnRandomDamage(this.game.settings.damageSpawnDelayInitial),
      this.game.settings.damageSpawnDelayInitial,
    );
    new AltitudeIndicator(this, 974, 540);

    new WarningsIndicator(this, 0, 0);

    if (this.game.settings.debug) {
      this.spawnDebugStuff();
    } else {
      this.spawnTools();
    }
    this.createScoreText();
    new Light(this, 230, 75);
    new Light(this, 990, 75);
    new Light(this, 230, 555);
    new Light(this, 990, 555);
    this.setUpCamera();

    this.game.airconsole.onMessage = this.onMessage.bind(this);
  }

  onMessage(from, data) {
    if (data.element == 'dpad') {
      this.getPlayerById(from).applyDirection(data.data.key, data.data.pressed);
    } else if (data.element == 'use') {
      this.getPlayerById(from).useTool();
    } else if (data.element == 'pickUpDrop') {
      this.getPlayerById(from).pickUpDropTool();
    }
  }

  createScoreText() {
    this.scoreText = this.make.text({
      x: -80,
      y: 20,
      text: 'Score: ',
      style: { font: '40px Arial', color: '#CCC', align: 'center' },
      origin: { x: 0, y: 0.5 },
      add: true,
    });
    this.scoreText.setShadow(3, 3, '#333333', 2, true, true);
  }

  setUpCamera() {
    const fadeTime = 6000;
    this.cameras.main.setZoom(0.4);
    this.cameras.main.zoomTo(1.0, fadeTime);
    this.cameras.main.pan(
      this.game.config.width / 2 - 100,
      this.game.config.height / 2,
      fadeTime,
    );
  }

  spawnDebugStuff() {
    new Leak(this, 400, 200, this.damageGroupNotColliding);
    new PipeWrench(this, 400, 300, this.toolGroup);

    new Fire(this, 500, 200, this.damageGoupColliding);
    new Extinguisher(this, 500, 300, this.toolGroup);

    new Hole(this, 600, 200, this.damageGoupColliding);
    new Hammer(this, 600, 300, this.toolGroup);

    new Electro(this, 700, 200, this.damageGroupNotColliding);
    new SolderingIron(this, 700, 300, this.toolGroup);

    new CoalDispenser(this, 300, 200, this.toolGroup);
  }

  spawnRandomDamage(timer) {
    console.log('Spawn random damage: ' + timer);
    // todo select player
    //chance manipulate possibility to spawn specific effect dependant to already spawned effects
    //detect  damage to spawn
    var damageIndicator = Math.floor(Math.random() * 4);
    switch (damageIndicator) {
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
        this.spawnFireDamage();
        break;
    }
    timer = Math.max(
      timer - this.game.settings.difficulity,
      this.game.settings.damageSpawnDelayMin,
    );
    setTimeout(() => this.spawnRandomDamage(timer), timer);
  }

  spawnPipeDamage() {
    if (mapAreas.pipeAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.pipeAreas.length);
    // cooridnate selector
    var xCoordinate =
      mapAreas.pipeAreas[areaSelector].xSource +
      Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].xLength);
    var yCoordinate =
      mapAreas.pipeAreas[areaSelector].ySource +
      Math.floor(Math.random() * mapAreas.pipeAreas[areaSelector].yLength);

    new Leak(this, xCoordinate, yCoordinate, this.damageGroupNotColliding);
  }

  spawnElectricityDamage() {
    if (mapAreas.electricityAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(
      Math.random() * mapAreas.electricityAreas.length,
    );
    // cooridnate selector
    var xCoordinate =
      mapAreas.electricityAreas[areaSelector].xSource +
      Math.floor(
        Math.random() * mapAreas.electricityAreas[areaSelector].xLength,
      );
    var yCoordinate =
      mapAreas.electricityAreas[areaSelector].ySource +
      Math.floor(
        Math.random() * mapAreas.electricityAreas[areaSelector].yLength,
      );

    new Electro(this, xCoordinate, yCoordinate, this.damageGroupNotColliding);
  }

  spawnHoleDamage() {
    if (mapAreas.holeAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.holeAreas.length);
    // cooridnate selector
    var xCoordinate =
      mapAreas.holeAreas[areaSelector].xSource +
      Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].xLength);
    var yCoordinate =
      mapAreas.holeAreas[areaSelector].ySource +
      Math.floor(Math.random() * mapAreas.holeAreas[areaSelector].yLength);

    new Hole(this, xCoordinate, yCoordinate, this.damageGoupColliding);
  }

  spawnFireDamage() {
    if (mapAreas.fireAreas.length == 0) {
      return;
    }
    // area slector
    var areaSelector = Math.floor(Math.random() * mapAreas.fireAreas.length);
    // cooridnate selector
    var xCoordinate =
      mapAreas.fireAreas[areaSelector].xSource +
      Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].xLength);
    var yCoordinate =
      mapAreas.fireAreas[areaSelector].ySource +
      Math.floor(Math.random() * mapAreas.fireAreas[areaSelector].yLength);

    new Fire(this, xCoordinate, yCoordinate, this.damageGoupColliding);
  }

  getRandomPlayer() {
    return this.playerGroup.children.entries[
      Math.floor(Math.random() * this.playerGroup.children.entries.length)
    ];
  }

  getPlayerById(id) {
    return this.playerGroup.children.entries.filter(
      player => player.playerId == id,
    )[0];
  }

  spawnTools() {
    function randomX() {
      return Math.random() * 500 - 250;
    }
    function randomY() {
      return Math.random() * 250 - 125;
    }
    let p = null;
    p = this.getRandomPlayer();
    new Hammer(this, p.x + randomX(), p.y + randomY(), this.toolGroup);
    p = this.getRandomPlayer();
    new Extinguisher(this, p.x + randomX(), p.y + randomY(), this.toolGroup);
    p = this.getRandomPlayer();
    new PipeWrench(this, p.x + randomX(), p.y + randomY(), this.toolGroup);
    p = this.getRandomPlayer();
    new SolderingIron(this, p.x + randomX(), p.y + randomY(), this.toolGroup);
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
      lifespan: 600,
      tint: 0xdddddd,
    });
  }

  gameOver() {
    this.game.airconsole.broadcast({ show_view_id: 'view-3' });
    this.scene.restart();
    this.scene.start('GameOverScene');
  }

  update(time, delta) {
    const { settings } = this.game;

    // Calc Speed
    this.game.state.speed =
      this.game.state.engineEfficency * this.game.settings.maxShipSpeed;
    this.game.state.score += 0.0001 * delta * this.game.state.speed;
    this.scoreText.setText('Score: ' + Math.round(this.game.state.score));

    // Calc height based on Holes
    const numberOfHoles = countDamagesByToolType(this.scene, 'HAMMER');
    const altitudeDelta = settings.altitudeChange * (numberOfHoles - 1);

    this.game.state.altitude -= altitudeDelta;
    if (this.game.state.altitude <= 0) {
      this.gameOver();
    }
    if (this.game.state.altitude > 100) {
      this.game.state.altitude = 100;
    }

    // Calc voltage based on sparcles
    const voltageDamageCount = countDamagesByToolType(
      this.scene,
      'SOLDERING_IRON',
    );
    const voltageDelta = settings.voltageChange * (voltageDamageCount - 1);
    this.game.state.voltage -= voltageDelta;
    if (this.game.state.voltage <= 0) {
      this.gameOver();
    }
    if (this.game.state.voltage > 100) {
      this.game.state.voltage = 100;
    }

    // Move parallax background based on speed (clouds still move when standing still)
    this.parallaxBgClouds.tilePositionX += 0.2 * this.game.state.speed - 0.5;
    this.parallaxBgForest.tilePositionX += 0.1 * this.game.state.speed;
  }
}

export default GameScene;
