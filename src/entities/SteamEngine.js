class SteamFurnace extends Phaser.GameObjects.Container {
  constructor(scene, id) {
    super(scene, 218 - 50, id === 1 ? 0 : 376 - 125);

    const graphics = scene.make.graphics(50, 125);
    graphics.fillStyle(0x0000ff, 0.2);
    graphics.fillRect(0, 0, 50, 125);
    this.add(graphics);
  }
}

export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 106, 352);

    const graphics = scene.make.graphics(218, 376);
    graphics.fillStyle(0xff0000, 0.2);
    graphics.fillRect(0, 0, 218, 376);
    this.add(graphics);

    this.furnace1 = new SteamFurnace(scene, 1);
    this.add(this.furnace1);
    this.furnace2 = new SteamFurnace(scene, 2);
    this.add(this.furnace2);

    scene.add.existing(this);
  }
}
