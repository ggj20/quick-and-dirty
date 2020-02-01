class ItemTube extends Phaser.GameObjects.Container {
  constructor(scene, pos1, pos2) {
    super(scene, 0, 0);
    scene.add.existing(this);
  }
}

export default ItemTube;
