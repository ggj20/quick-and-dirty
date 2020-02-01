class ItemTube extends Phaser.GameObjects.Container {
  constructor(scene, pos1, pos2, colGroup, xSize = 50, ySize = 50) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.tube1 = scene.add.zone(pos1.x, pos1.y).setSize(xSize, ySize);
    this.tube2 = scene.add.zone(pos2.x, pos2.y).setSize(xSize, ySize);
    this.add(this.tube1);
    this.add(this.tube2);
    scene.physics.world.enable(this.tube1, 0);
    scene.physics.world.enable(this.tube2, 0);
    colGroup.add(this.tube1);
    colGroup.add(this.tube2);

    this.createEmitter();
  }

  teleportTool(zone, tool) {
    if(zone == this.tube1) {
      tool.setPosition(this.tube2.x, this.tube2.y);
    } else {
      tool.setPosition(this.tube1.x, this.tube1.y);
    }
  }

  createEmitter() {
    this.emitter = this.scene.add.particles('SteamParticle').createEmitter({
        x: 0,
        y: 0,
        speed: { min: 10, max: 50 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.3, end: 1 },
        alpha: { start: 1, end: 0.4 },
        blendMode: 'NORMAL',
        frequency: -1,
        active: true,
        lifespan: 1000,
        quantity: 20,
        tint: [0x333333, 0x999999, 0xCCCCCC],
    });
  }

  }

}

export default ItemTube;
