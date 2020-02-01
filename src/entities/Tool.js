class Tool extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, toolType) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.toolType = toolType;
    }

    use() {
        console.log("Repair method not implemented for this tool")
    }
}

export default Tool;
