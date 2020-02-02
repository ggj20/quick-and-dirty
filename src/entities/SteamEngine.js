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
    this.dropZone.parent = this;
    this.add(this.dropZone);
    scene.physics.world.enable(this.dropZone, 0);
  }

  teleportTool(zone, tool) {
    console.log('teleport to furnace', zone, zone.parent, tool);
  }
}

export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene, zoneGroup) {
    super(scene, engineWorldPositionX, engineWorldPositionY);

    // Draw area of engine sprite
    const graphics = scene.make.graphics(engineAreaWidth, engineAreaHeight);
    graphics.fillStyle(0xff0000, 0.2);
    graphics.fillRect(0, 0, engineAreaWidth, engineAreaHeight);
    this.add(graphics);

    this.furnace1 = new SteamFurnace(scene, 1);
    this.add(this.furnace1);
    zoneGroup.add(this.furnace1.dropZone);
    this.furnace2 = new SteamFurnace(scene, 2);
    this.add(this.furnace2);
    zoneGroup.add(this.furnace2.dropZone);

    scene.add.existing(this);
  }
}
