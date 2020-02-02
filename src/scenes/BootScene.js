import Phaser from 'phaser';

import PlayerSpriteSheet from "../assets/player.png";
import EngineDoorSpriteSheet from "../assets/engine-door.png";
import HammerSprite from "../assets/hammer.png";
import ExtinguisherSprite from "../assets/extinguisher.png";
import PipeWrenchSprite from "../assets/pipe-wrench.png";
import SolderingIronSprite from "../assets/soldering-iron.png";
import CoalSprite from "../assets/coal.png";
import LeakSprite from "../assets/leak.png";
import ShipSprite from "../assets/ship.png";
import SteamParticle from "../assets/steam-particle.png";
import EngineFlameParticle from "../assets/engine-flame.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    })
  }

  preload() {
    console.log('loading boot');
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x444444, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on('progress', function (value) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
        console.log(file.src);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      console.log('complete');
    });
    this.load.spritesheet('PlayerSpriteSheet', PlayerSpriteSheet, { frameWidth: 60, frameHeight: 82, endFrame: 144 });
    this.load.image('HammerSprite', HammerSprite);
    this.load.image('ExtinguisherSprite', ExtinguisherSprite);
    this.load.image('PipeWrenchSprite', PipeWrenchSprite);
    this.load.image('SolderingIronSprite', SolderingIronSprite);
    this.load.image('CoalSprite', CoalSprite);
    this.load.image('LeakSprite', LeakSprite);
    this.load.image('ShipSprite', ShipSprite);
    this.load.image('SteamParticle', SteamParticle);
    this.load.image('EngineFlameParticle', EngineFlameParticle);
    this.load.spritesheet('EngineDoorSpriteSheet', EngineDoorSpriteSheet, { frameWidth: 88, frameHeight: 122, endFrame: 32 });
  }

  create() {
    console.log('complete Boot, changing to TitleScene');
    this.scene.start('TitleScene');
  }
}

export default BootScene;
