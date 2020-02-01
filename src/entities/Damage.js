class Damage extends Phaser.GameObjects.Container  {
    constructor(scene, x, y, texture, frame, damageType) {

        super(scene, x, y,);
        scene.add.existing(this);
        this.damageSprite = scene.add.image(0, 0, texture,frame);
        this.add(this.damageSprite);
        this.setSize(this.damageSprite.width, this.damageSprite.height);
        this.damageType = damageType;
        this.status = 100;
    }

    repair(toolType) {
        console.log("Repair method not implemented on damage type");
    }
}


  
export default Damage;
