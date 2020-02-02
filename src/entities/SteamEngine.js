const engineWorldPositionX = 106;
const engineWorldPositionY = 352;

const engineAreaWidth = 218;
const engineAreaHeight = 376;

const dropZoneWidth = 50;
const dropZoneHeight = 125;

export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene, zoneGroup) {
    super(scene, engineWorldPositionX, engineWorldPositionY);

    this.generateAnimations(scene);

    // Draw area of engine sprite
    const graphics = scene.make.graphics(engineAreaWidth, engineAreaHeight);
    graphics.fillStyle(0xff0000, 0.2);
    graphics.fillRect(0, 0, engineAreaWidth, engineAreaHeight);
    this.add(graphics);

    this.furnaceArray = [
      this.createFurnace(0, scene, zoneGroup),
      this.createFurnace(1, scene, zoneGroup)
    ];

    scene.add.existing(this);
  }

  teleportTool(zone, tool) {
    const { identifier } = zone;
    const { toolType } = tool;

    const furnace = this.furnaceArray[identifier];

    if (toolType === 'COAL') {
      furnace.anims.play('open-engine-door');
      console.log('feed the engine #', identifier, 'with', toolType);
      tool.destroy();
    }
  }
  generateAnimations(scene) {
    scene.anims.create({
      key: 'open-engine-door',
      frames: scene.anims.generateFrameNumbers('EngineDoorSpriteSheet', { start: 0, end: 31, first: 0 }),
      frameRate: 30,
      repeat: false,
    });
  }

  createFurnace(identifier, scene, zoneGroup) {
    const positionX = engineAreaWidth - dropZoneWidth;
    // First starts from top, the second from bottom
    const positionY = identifier === 0 ? 0 : engineAreaHeight - dropZoneHeight;

    const dropZoneCenterX = dropZoneWidth / 2;
    const dropZoneCenterY = dropZoneHeight / 2;

    const dropZone = scene.add
      .zone(dropZoneCenterX + positionX, dropZoneCenterY + positionY)
      .setSize(dropZoneWidth, dropZoneHeight);
    dropZone.identifier = identifier;
    this.add(dropZone);
    scene.physics.world.enable(dropZone, 0);
    zoneGroup.add(dropZone);

    const furnaceSprite = scene.add.sprite(positionX, positionY + dropZoneCenterY, 'EngineDoorSpriteSheet');
    this.add(furnaceSprite);
    furnaceSprite.anims.play('open-engine-door');

    return furnaceSprite;
  }
}
