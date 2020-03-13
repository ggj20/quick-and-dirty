export default class Thermometer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);
    scene.add.existing(this);
    this.baseY = y;
    this.maxHeight = height;

    this.rect = scene.add
      .rectangle(x, y, width, height, 0x000000, 0.5)
      .setOrigin(0, 0);

    this.updateHeight();
    setInterval(() => this.updateHeight(), 500);
  }

  updateHeight() {
    const {
      engineTemperatureMaximum,
      engineTemperatureOptimal,
    } = this.scene.game.settings;
    const { engineEfficency } = this.scene.game.state;

    const factor = engineTemperatureMaximum / engineTemperatureOptimal; // should be 1.25 for default settings
    const height = engineEfficency * (this.maxHeight / factor);

    this.rect.y = this.baseY + this.maxHeight - height;
    this.rect.height = height;

    const color = Phaser.Display.Color.Interpolate.RGBWithRGB(
      0,
      0,
      255,
      255,
      0,
      0,
      this.maxHeight,
      height,
    );

    this.rect.fillColor = Phaser.Display.Color.GetColor(
      color.r,
      color.g,
      color.b,
    );
  }
}
