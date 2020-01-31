class Tool extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    use() {
        console.log(this.constructor.name)
    }
}
  
export default Tool;
  