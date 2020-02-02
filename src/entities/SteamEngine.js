const engineWorldPositionX = 106;
const engineWorldPositionY = 352;

const engineAreaWidth = 218;
const engineAreaHeight = 376;

const dropZoneWidth = 50;
const dropZoneHeight = 125;

export default class SteamEngine extends Phaser.GameObjects.Container {
  constructor(scene, zoneGroup) {
    super(scene, engineWorldPositionX, engineWorldPositionY);

    this.scene = scene;

    this.generateAnimations(scene);

    this.thermometer = this.createThermometer();
    this.updateThermometer();

    this.furnaceArray = [
      this.createFurnace(0, scene, zoneGroup),
      this.createFurnace(1, scene, zoneGroup),
    ];

    scene.add.existing(this);

    this.lastUpdate = new Date();
    setInterval(() => this.updateGameLogic(), 500);
  }

  updateGameLogic() {
    const now = new Date();
    const timeDelta = now - this.lastUpdate;

    // Update global game state
    const { engineTemperatureDecreaseFactor } = this.scene.game.settings;

    const nextEngineTemperature =
      this.scene.game.state.engineTemperature -
      timeDelta * engineTemperatureDecreaseFactor;

    if (nextEngineTemperature > 0) {
      this.scene.game.state.engineTemperature = nextEngineTemperature;
    }

    this.updateThermometer();

    this.lastUpdate = now;
  }

  teleportTool(zone, tool) {
    const { identifier } = zone;
    const { toolType } = tool;
    const { engineTemperaturePerCoalDrop } = this.scene.game.settings;

    const furnace = this.furnaceArray[identifier];

    if (toolType === 'COAL') {
      furnace.anims.play('open-engine-door');
      console.log('feed the engine #', identifier, 'with', toolType);

      this.scene.game.state.engineTemperature += engineTemperaturePerCoalDrop;

      tool.destroy();
    }
  }

  generateAnimations(scene) {
    scene.anims.create({
      key: 'open-engine-door',
      frames: scene.anims.generateFrameNumbers('EngineDoorSpriteSheet', {
        start: 0,
        end: 31,
        first: 0,
      }),
      frameRate: 30,
      repeat: false,
    });
  }

  createThermometer() {
    const size = 50;

    const indicator = this.scene.add.rectangle(
      engineWorldPositionX + engineAreaWidth - dropZoneWidth - size / 2,
      engineWorldPositionY + engineAreaHeight / 2,
      size,
      size,
      0x000000,
    );

    return indicator;
  }

  updateThermometer() {
    const { engineTemperatureLowerBound, engineTemperatureUpperBound } = this.scene.game.settings;
    const { engineTemperature } = this.scene.game.state;

    let color;
    if (engineTemperature <= engineTemperatureLowerBound) {
      // engine off
      color = 0x000000;
    } else if ( engineTemperature >= engineTemperatureUpperBound ) {
      // engine overdrive
      color = 0xff0000;
    } else {
      // engine operational
      color = 0x00ff00;
    }

    console.log(engineTemperature, color);

    this.thermometer.setFillStyle(color);
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

    const furnaceSprite = scene.add.sprite(
      positionX,
      positionY + dropZoneCenterY,
      'EngineDoorSpriteSheet',
    );
    this.add(furnaceSprite);
    furnaceSprite.anims.play('open-engine-door');

    return furnaceSprite;
  }
}
