class Tool extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, toolType) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.toolType = toolType;
    }

    use() {
        console.log("Repair method not implemented for this tool")
    }
}

export default Tool;

