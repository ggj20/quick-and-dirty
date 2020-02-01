class Damage extends Phaser.GameObjects.Container  {
    constructor(scene, x, y, texture, damageType, repairDebounce) {
        super(scene, x, y,);
        scene.add.existing(this);

        this.damageSprite = scene.add.image(0, 0, texture);
        this.add(this.damageSprite);

        this.setSize(this.damageSprite.width, this.damageSprite.height);

        this.progressBar = scene.add.graphics();
        this.progressBox = scene.add.graphics();
        this.add(this.progressBar);
        this.add(this.progressBox);
        this.progressBox.fillStyle(0x222222, 0.6);
        this.progressBox.fillRect(- this.damageSprite.width*0.75, - this.damageSprite.height/1.5, this.damageSprite.width * 1.5, this.damageSprite.height / 5);
        this.progressBox.setVisible(false);

        this.damageType = damageType;
        this.repairDebounce = repairDebounce;
        this.status = 100;

        this.lastRepair = 0;
    }

    repair() {
        var d = new Date();
        var acutalRepair = d.getTime();
        if(this.lastRepair + this.repairDebounce < acutalRepair) {
            this.status -= 10;
            this.setStatusBar();
            this.lastRepair = acutalRepair;
        }
    }

    setStatusBar() {
        if ( !this.progressBox.visible){
            console.log("set bar to visible");
            this.progressBox.setVisible(true);
            this.progressBar.setVisible(true);
        }

        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(- this.damageSprite.width*0.75, - this.damageSprite.height/1.5, (this.damageSprite.width * 1.5) * Math.abs(this.status/100. - 1), this.damageSprite.height / 5);
    }
}

export default Damage;
