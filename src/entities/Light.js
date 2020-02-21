class Light extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.shadow = scene.add.image(0, 0, 'ShadowSprite').setOrigin(0, 0);
    this.add(this.shadow);
    this.shadow.alpha = 0;
    setTimeout(this.update.bind(this), 2000);
  }

  update() {
    if(Math.random() < this.scene.game.state.voltage / 100) {
      this.shadow.alpha = 0;
    } else {
      this.shadow.alpha = 1 - (this.scene.game.state.voltage / 100);
    setTimeout(this.update.bind(this), 2000);
  }

  getAlphaLevel(voltage) {
    const ranges = [
      [80, 0],
      [70, 0.5],
      [50, 0.8],
      [0, 1.0],
    ]
    for(let step of ranges) {
      if(voltage >= step[0]) {
        return step[1];
      }
    }
  }
}

export default Light;
