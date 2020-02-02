export default class VoltageMeter extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);
    scene.add.existing(this);
    this.baseY = y;
    this.maxHeight = height;

    this.rect = scene.add.rectangle(x, y, width, height, 0xFFCE00, 0.75).setOrigin(0, 0);

    this.updateHeight();
    setInterval(() => this.updateHeight(), 500);
  }

  updateHeight() {
    const { voltage } = this.scene.game.state;

    const height = voltage / 100 * (this.maxHeight / 1.25);

    this.rect.y = this.baseY + this.maxHeight - height;
    this.rect.height = height;
  }
}
