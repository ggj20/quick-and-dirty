export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 108, 352);

    const graphics = scene.make.graphics(207, 376);
    graphics.fillStyle(0xffff00, 0.5);
    graphics.fillRect(0, 0, 205, 376);
    this.add(graphics);

    scene.add.existing(this);
  }
}
