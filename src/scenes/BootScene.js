import Phaser from 'phaser';

import PlayerSprite from "../assets/player.png";


class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    })
  }

  preload() {
    console.log('loading boot');
    this.load.image('PlayerSprite', PlayerSprite);
  }

  create() {
    // #TODO Add loading indicator
    this.scene.start('TitleScene');
  }
}

export default BootScene;
