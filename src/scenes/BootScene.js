import Phaser from 'phaser';

import PlayerSpriteSheet from "../assets/player.png";
import HammerSprite from "../assets/hammer.png";
import LeakSprite from "../assets/leak.png";
import ShipSprite from "../assets/ship.png";

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
    this.load.image('LeakSprite', LeakSprite);
    this.load.image('ShipSprite', ShipSprite);
  }

  create() {
    console.log('complete Boot, changing to TitleScene');
    this.scene.start('TitleScene');
  }
}

export default BootScene;
