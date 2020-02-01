const engineWorldPositionX = 106;
const engineWorldPositionY = 352;

const engineAreaWidth = 218;
const engineAreaHeight = 376;

const dropZoneWidth = 50;
const dropZoneHeight = 125;

class SteamFurnace extends Phaser.GameObjects.Container {
  constructor(scene, id) {
    super(
      scene,
      engineAreaWidth - dropZoneWidth,
      id === 1 ? 0 : engineAreaHeight - dropZoneHeight
    );

    this.dropZone = scene.add
      .zone(dropZoneWidth / 2, dropZoneHeight / 2)
      .setSize(dropZoneWidth, dropZoneHeight);
    this.add(this.dropZone);
    scene.physics.world.enable(this.dropZone, 0);
  }
}

export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, engineWorldPositionX, engineWorldPositionY);

    // Draw area of engine sprite
    const graphics = scene.make.graphics(engineAreaWidth, engineAreaHeight);
    graphics.fillStyle(0xff0000, 0.2);
    graphics.fillRect(0, 0, engineAreaWidth, engineAreaHeight);
    this.add(graphics);

    this.furnace1 = new SteamFurnace(scene, 1);
    this.add(this.furnace1);
    this.furnace2 = new SteamFurnace(scene, 2);
    this.add(this.furnace2);

    scene.add.existing(this);
  }
}
