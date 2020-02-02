class Light extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.shadow = scene.add.image(0, 0, 'ShadowSprite').setOrigin(0, 0);
    this.add(this.shadow);
    this.shadow.alpha = 0;
    setTimeout(this.update.bind(this), 1000);
  }

  update() {
    if(Math.random() < this.scene.game.state.voltage / 100) {
      this.shadow.alpha = 0;
    } else {
      this.shadow.alpha = 0.9;
    }
    setTimeout(this.update.bind(this), 1000);
  }
}

export default Light;
