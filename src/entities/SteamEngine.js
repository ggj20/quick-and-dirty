export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 106, 352);

    const graphics = scene.make.graphics(208, 376);
    graphics.fillStyle(0xff0000, 0.2);
    graphics.fillRect(0, 0, 208, 376);
    this.add(graphics);

    scene.add.existing(this);
  }
}
