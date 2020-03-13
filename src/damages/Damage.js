class Damage extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    group,
    texture,
    damageType,
    repairDebounce,
    configCreate = { start: 0, end: 34, first: 0 },
    configRepeat = { start: 30, end: 33, first: 29 },
    frameRate = 17,
    repeat = false,
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setImmovable();
    group.add(this);

    this.damageSprite = scene.add.sprite(0, 0, texture);
    this.add(this.damageSprite);

    this.scene.anims.create({
      key: 'damage_' + damageType,
      frames: this.scene.anims.generateFrameNumbers(texture, configCreate),
      frameRate: frameRate,
      repeat: repeat,
    });

    this.scene.anims.create({
      key: 'repeat_damage_' + damageType,
      frames: this.scene.anims.generateFrameNumbers(texture, configRepeat),
      frameRate: frameRate,
      repeat: -1,
    });

    this.damageSprite.on(
      'animationcomplete',
      function(sprite) {
        if (sprite.key === 'damage_' + damageType) {
          this.damageSprite.anims.play('repeat_damage_' + damageType);
        }
      },
      this,
    );

    this.damageSprite.anims.play('damage_' + damageType);

    this.setSize(this.damageSprite.width, this.damageSprite.height);

    this.progressBar = scene.add.graphics();
    this.progressBox = scene.add.graphics();
    this.add(this.progressBar);
    this.add(this.progressBox);
    this.progressBox.fillStyle(0x222222, 0.6);
    this.progressBox.fillRect(
      -this.damageSprite.width * 0.75,
      -this.damageSprite.height / 1.5,
      this.damageSprite.width * 1.5,
      this.damageSprite.height / 5,
    );
    this.progressBox.setVisible(false);

    this.damageType = damageType;
    this.repairDebounce = repairDebounce;
    this.status = 100;

    this.lastRepair = 0;
  }

  repair() {
    var d = new Date();
    var acutalRepair = d.getTime();
    if (this.lastRepair + this.repairDebounce < acutalRepair) {
      this.status -= 10;
      this.setStatusBar();
      this.lastRepair = acutalRepair;
    }
  }

  setStatusBar() {
    if (!this.progressBox.visible) {
      console.log('set bar to visible');
      this.progressBox.setVisible(true);
      this.progressBar.setVisible(true);
    }

    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRect(
      -this.damageSprite.width * 0.75,
      -this.damageSprite.height / 1.5,
      this.damageSprite.width * 1.5 * Math.abs(this.status / 100 - 1),
      this.damageSprite.height / 5,
    );
  }
}

export default Damage;
