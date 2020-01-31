import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    })
  }

  preload() {
    //this.load.image('name', 'path.png');
  }

  create() {
    // #TODO Add loading indicator
    this.scene.start('TitleScene');
  }
}

export default BootScene;
