import Phaser from 'phaser';

import Character1SpriteSheet from "../assets/character1.png";
import Character2SpriteSheet from "../assets/character2.png";
import Character3SpriteSheet from "../assets/character3.png";
import Character4SpriteSheet from "../assets/character4.png";
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
import InstructionsSprite from "../assets/instructions.png";

import ElectricSoundMP3 from "../assets/sounds/electric.mp3";
import ElectricSoundOGG from "../assets/sounds/electric.ogg";
import FireSoundMP3 from "../assets/sounds/fire.mp3";
import FireSoundOGG from "../assets/sounds/fire.ogg";
import FireExtinguisherSoundMP3 from '../assets/sounds/fire-extinguisher.mp3';
import FireExtinguisherSoundOGG from '../assets/sounds/fire-extinguisher.ogg';
import HammerSoundMP3 from '../assets/sounds/hammer.mp3';
import HammerSoundOGG from '../assets/sounds/hammer.ogg';
import HoleSoundMP3 from '../assets/sounds/hole.mp3';
import HoleSoundOGG from '../assets/sounds/hole.ogg';
import SolderingIronSoundMP3 from '../assets/sounds/soldering-iron.mp3';
import SolderingIronSoundOGG from '../assets/sounds/soldering-iron.ogg';
import SteamSoundMP3 from '../assets/sounds/steam.mp3';
import SteamSoundOGG from '../assets/sounds/steam.ogg';
import WrenchSoundMP3 from '../assets/sounds/wrench.mp3';
import WrenchSoundOGG from '../assets/sounds/wrench.ogg';
import BeepSoundMP3 from '../assets/sounds/beep.mp3';
import BeepSoundOGG from '../assets/sounds/beep.ogg';
import CharacterWalkSoundMP3 from '../assets/sounds/character-walk.mp3';
import CharacterWalkSoundOGG from '../assets/sounds/character-walk.ogg';
import EngineAddCoalSoundMP3 from '../assets/sounds/engine-add-coal.mp3';
import EngineAddCoalSoundOGG from '../assets/sounds/engine-add-coal.ogg';
import ItemDropSoundMP3 from '../assets/sounds/item-drop.mp3';
import ItemDropSoundOGG from '../assets/sounds/item-drop.ogg';
import ItemPickUpSoundMP3 from '../assets/sounds/item-pick-up.mp3';
import ItemPickUpSoundOGG from '../assets/sounds/item-pick-up.ogg';
import TubeSoundMP3 from '../assets/sounds/tube.mp3';
import TubeSoundOGG from '../assets/sounds/tube.ogg';


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
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        this.loadingBarConstants.x + this.loadingBarConstants.padding,
        this.loadingBarConstants.y + this.loadingBarConstants.padding,
        (this.loadingBarConstants.width - 2 * this.loadingBarConstants.padding) * value,
        this.loadingBarConstants.height - 2 * this.loadingBarConstants.padding,
      );
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      console.log('complete');
    });
    this.load.spritesheet('Character1SpriteSheet', Character1SpriteSheet, { frameWidth: 60, frameHeight: 82, endFrame: 144 });
    this.load.spritesheet('Character2SpriteSheet', Character2SpriteSheet, { frameWidth: 60, frameHeight: 82, endFrame: 144 });
    this.load.spritesheet('Character3SpriteSheet', Character3SpriteSheet, { frameWidth: 60, frameHeight: 82, endFrame: 144 });
    this.load.spritesheet('Character4SpriteSheet', Character4SpriteSheet, { frameWidth: 60, frameHeight: 82, endFrame: 144 });
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
    this.load.image('InstructionsSprite', InstructionsSprite);
    this.load.image('EngineFlameParticle', EngineFlameParticle);
    this.load.spritesheet('EngineDoorSpriteSheet', EngineDoorSpriteSheet, { frameWidth: 88, frameHeight: 122, endFrame: 32 });
    this.load.image('ParallaxBgClouds', ParallaxBgClouds);
    this.load.image('ParallaxBgForest', ParallaxBgForest);

    this.load.audio('ElectricSound', [ElectricSoundMP3, ElectricSoundOGG]);
    this.load.audio('FireSound', [FireSoundMP3, FireSoundOGG]);
    this.load.audio('FireExtinguisherSound', [FireExtinguisherSoundMP3, FireExtinguisherSoundOGG]);
    this.load.audio('HammerSound', [HammerSoundMP3, HammerSoundOGG]);
    this.load.audio('HoleSound', [HoleSoundMP3, HoleSoundOGG]);
    this.load.audio('SolderingIronSound', [SolderingIronSoundMP3, SolderingIronSoundOGG]);
    this.load.audio('SteamSound', [SteamSoundMP3, SteamSoundOGG]);
    this.load.audio('WrenchSound', [WrenchSoundMP3, WrenchSoundOGG]);
    this.load.audio('BeepSound', [BeepSoundMP3, BeepSoundOGG]);
    this.load.audio('CharacterWalkSound', [CharacterWalkSoundMP3, CharacterWalkSoundOGG]);
    this.load.audio('EngineAddCoalSound', [EngineAddCoalSoundMP3, EngineAddCoalSoundOGG]);
    this.load.audio('ItemDropSound', [ItemDropSoundMP3, ItemDropSoundOGG]);
    this.load.audio('ItemPickUpSound', [ItemPickUpSoundMP3, ItemPickUpSoundOGG]);
    this.load.audio('TubeSound', [TubeSoundMP3, TubeSoundOGG]);
  }

  create() {
    console.log('complete Boot, changing to TitleScene');
    this.scene.start('TitleScene');
  }
}

export default BootScene;
