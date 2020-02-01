import Phaser from "phaser";
import Player from "../entities/Player";
import Hammer from "../entities/Hammer";
import Extinguisher from "../entities/Extinguisher";
import SolderingIron from "../entities/SolderingIron";
import PipeWrench from "../entities/PipeWrench.js";
import Leak from "../entities/Leak";
import Fire from "../entities/Fire";
import Hole from "../entities/Hole";
import Electro from "../entities/Electro";
import ItemTube from "../entities/ItemTube";
import SteamEngine from "../entities/SteamEngine";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    console.log("loading game");
  }

  create() {
    this.damageGoup = this.add.group();
    this.toolGroup = this.add.group();
    this.zoneGroup = this.add.group();

    this.shipSprite = this.add
      .image(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "ShipSprite"
      )
      .setOrigin(0.5, 0.5);

    this.rooms = [
      [
        [275, 128],
        [630, 350]
      ],
      [
        [1040, 128],
        [630, 350]
      ],
      [
        [275, 605],
        [630, 350]
      ],
      [
        [1040, 605],
        [630, 350]
      ]
    ];

    this.spawnTools();

    for (let i = 0; i < this.game.settings.playerCount; i++) {
      new Player(
        this,
        this.rooms[i][0],
        this.rooms[i][1],
        i,
        this.toolGroup,
        this.damageGoup,
        this.zoneGroup
      );
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
    new ItemTube(this, { x: 880, y: 300 }, { x: 1065, y: 300 }, this.zoneGroup); // Top
    new ItemTube(this, { x: 590, y: 450 }, { x: 590, y: 630 }, this.zoneGroup); // Left
    new ItemTube(
      this,
      { x: 1355, y: 450 },
      { x: 1355, y: 630 },
      this.zoneGroup
    ); // Right
    new ItemTube(this, { x: 880, y: 775 }, { x: 1065, y: 775 }, this.zoneGroup); // Bottom

    // Steam Engine
    new SteamEngine(this);
  }

  spawnTools() {
    this.hammer = new Hammer(this, 400, 400);
    this.toolGroup.add(this.hammer);
    this.physics.world.enable(this.hammer);

    this.extinguisher = new Extinguisher(this, 300, 400);
    this.toolGroup.add(this.extinguisher);
    this.physics.world.enable(this.extinguisher);

    this.pipeWrench = new PipeWrench(this, 400, 400);
    this.toolGroup.add(this.pipeWrench);
    this.physics.world.enable(this.pipeWrench);

    this.solderingIron = new SolderingIron(this, 400, 400);
    this.toolGroup.add(this.solderingIron);
    this.physics.world.enable(this.solderingIron);
  }
}

export default GameScene;
