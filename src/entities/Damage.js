class Damage extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, damageType) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.damageType = damageType;
        this.status = 100;
    }

    repair(toolType) {
        console.log("Repair method not implemented on damage type");
    }
}
  
export default Damage;
  