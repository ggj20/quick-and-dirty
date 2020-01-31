import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    })
  }

  preload() {
    console.log('loading title');
  }

  create() {
    this.scene.start('GameScene');
  }
}

export default TitleScene;
