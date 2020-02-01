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
  }

  teleportTool(zone, tool) {
    if(zone == this.tube1) {
      tool.setPosition(this.tube2.x, this.tube2.y);
    } else {
      tool.setPosition(this.tube1.x, this.tube1.y);
    }

  }

}

export default ItemTube;
