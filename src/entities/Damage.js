class Damage extends Phaser.GameObjects.Container  {
    constructor(scene, x, y, texture, frame, damageType) {

        super(scene, x, y,);
        scene.add.existing(this);

        this.damageSprite = scene.add.image(0, 0, texture,frame);
        this.add(this.damageSprite);

        this.setSize(this.damageSprite.width, this.damageSprite.height);

        this.progressBar = scene.add.graphics();
        this.progressBox = scene.add.graphics();
        this.add(this.progressBar);
        this.add(this.progressBox);
        this.progressBox.fillStyle(0x444444, 0.8);
        this.progressBox.fillRect(- this.damageSprite.width/1.5, - this.damageSprite.height/1.5, this.damageSprite.width * 1.5, this.damageSprite.height / 5); // ToDo set position symmetrical

        this.damageType = damageType;
        this.status = 100;
    }

    repair(toolType) {
        console.log("Repair method not implemented on damage type");
    }
    setStatusBarVisibility(){
        //ToDo
    }
    setStatusBar() {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(- this.damageSprite.width/1.5, - this.damageSprite.height/1.5, (this.damageSprite.width * 1.5) * Math.abs(this.status/100. - 1), this.damageSprite.height / 5);
    }
}


  
export default Damage;
