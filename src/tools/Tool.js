class Tool extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, toolType, toolGroup) {
    super(scene, x, y, texture);
    toolGroup.add(this);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.toolType = toolType;
  }

  use() {
    console.log('Repair method not implemented for this tool');
  }
}

export default Tool;
