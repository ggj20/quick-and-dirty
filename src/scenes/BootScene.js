import Phaser from 'phaser';

import PlayerSpriteSheet from "../assets/player.png";
import EngineDoorSpriteSheet from "../assets/engine-door.png";
import HammerSprite from "../assets/hammer.png";
import ExtinguisherSprite from "../assets/extinguisher.png";
import PipeWrenchSprite from "../assets/pipe-wrench.png";
import SolderingIronSprite from "../assets/soldering-iron.png";
import CoalSprite from "../assets/coal.png";
import LeakSpriteSheet from "../assets/leak.png";
import ElectroSpriteSheet from "../assets/electro.png";
import HoleSpriteSheet from "../assets/hole.png";
import FireSpriteSheet from "../assets/fire.png";
import ShipSprite from "../assets/ship.png";
import SteamParticle from "../assets/steam-particle.png";
import EngineFlameParticle from "../assets/engine-flame.png";
import ShadowSprite from "../assets/shadow.png";
import ParallaxBgClouds from "../assets/parallax-bg-clouds.png";
import ParallaxBgForest from "../assets/parallax-bg-forest.png";
import GameOverSprite from "../assets/game-over.jpg";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });

    this.loadingBarConstants = {
      width: 320,
      height: 50,
      padding: 10,
    };
  }

  preload() {
    console.log('loading boot');
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x444444, 0.8);

    this.loadingBarConstants.x = (this.game.scale.displaySize.width - this.loadingBarConstants.width) / 2;
    this.loadingBarConstants.y = (this.game.scale.displaySize.height - this.loadingBarConstants.height) / 2;

    progressBox.fillRect(
      this.loadingBarConstants.x,
      this.loadingBarConstants.y,
      this.loadingBarConstants.width,
      this.loadingBarConstants.height,
    );

    this.load.on('progress', (value) => {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        this.loadingBarConstants.x + this.loadingBarConstants.padding,
        this.loadingBarConstants.y + this.loadingBarConstants.padding,
        (this.loadingBarConstants.width - 2 * this.loadingBarConstants.padding) * value,
        this.loadingBarConstants.height - 2 * this.loadingBarConstants.padding,
      );
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
    this.load.spritesheet('LeakSpriteSheet', LeakSpriteSheet, { frameWidth: 60, frameHeight: 60, endFrame: 34 });
    this.load.spritesheet('ElectroSpriteSheet', ElectroSpriteSheet, { frameWidth: 60, frameHeight: 60, endFrame: 34 });
    this.load.spritesheet('HoleSpriteSheet', HoleSpriteSheet, { frameWidth: 60, frameHeight: 60, endFrame: 34 });
    this.load.spritesheet('FireSpriteSheet', FireSpriteSheet, { frameWidth: 60, frameHeight: 60, endFrame: 34 });

    this.load.image('HammerSprite', HammerSprite);
    this.load.image('ExtinguisherSprite', ExtinguisherSprite);
    this.load.image('PipeWrenchSprite', PipeWrenchSprite);
    this.load.image('SolderingIronSprite', SolderingIronSprite);
    this.load.image('CoalSprite', CoalSprite);
    this.load.image('ShipSprite', ShipSprite);
    this.load.image('SteamParticle', SteamParticle);
    this.load.image('ShadowSprite', ShadowSprite);
    this.load.image('GameOverSprite', GameOverSprite);
    this.load.image('EngineFlameParticle', EngineFlameParticle);
    this.load.spritesheet('EngineDoorSpriteSheet', EngineDoorSpriteSheet, { frameWidth: 88, frameHeight: 122, endFrame: 32 });
    this.load.image('ParallaxBgClouds', ParallaxBgClouds);
    this.load.image('ParallaxBgForest', ParallaxBgForest);
  }

  create() {
    console.log('complete Boot, changing to TitleScene');
    this.scene.start('TitleScene');
  }
}

export default BootScene;
