import Phaser from 'phaser';

import PlayerSprite from "../assets/player.png";
import HammerSprite from "../assets/hammer.png";
import LeakSprite from "../assets/leak.png";

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
    this.load.image('PlayerSprite', PlayerSprite);
    this.load.image('HammerSprite', HammerSprite);
    this.load.image('LeakSprite', LeakSprite);
  }

  create() {
    console.log('complete Boot, changing to TitleScene');
    this.scene.start('TitleScene');
  }
}

export default BootScene;
