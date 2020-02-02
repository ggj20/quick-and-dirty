class Player extends Phaser.GameObjects.Container {
  constructor(scene, pos1, pos2, playerId, toolGroup, damageGroup, zoneGroup, runningEmitter) {
    super(scene, 0, 0);
    scene.add.existing(this);

    this.playerId = playerId;

    this.speed = this.scene.game.settings.playerSpeed;

    this.generateAnimations();
    this.playerSprite = scene.add.sprite(0, 0, 'PlayerSpriteSheet').setOrigin(0.1, 0.5);
    this.add(this.playerSprite);

    this.scene.physics.world.enable(this);

	this.playerText = scene.make.text({
		x: this.playerSprite.width / 2 - 8,
		y: -this.playerSprite.height,
		text: 'Player ' + (this.playerId + 1),
		style: { align: 'center' },
		origin: { x: 0.5, y: 0 },
	});
    this.add(this.playerText);

    scene.input.gamepad.on('down', this.onButtonPress, this);
    scene.physics.world.enable(this);
    this.body.setSize(this.playerSprite.width * 0.8, this.playerSprite.height / 2);

    this.body.setCollideWorldBounds(true);
    this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(pos1[0], pos1[1], pos2[0], pos2[1]));
    this.setPosition(pos1[0]+pos2[0]/2 - this.playerSprite.width/2, pos1[1]+pos2[1]/2 - this.playerSprite.height/2);
    this.toolGroup = toolGroup;
    this.damageGroup = damageGroup;
    this.zoneGroup = zoneGroup;

    this.activeTool = null;
    if(this.scene.game.settings.debug) {
      this.debugDrawRoom(pos1, pos2);
    }

	this.runningEmitter = runningEmitter;
	this.runningEmitter.follow = this;
	this.runningEmitter.followOffset.x = this.playerSprite.width / 2 - 8;
	this.runningEmitter.followOffset.y = this.playerSprite.height / 2 - 6;
  }

  onButtonPress(pad, button, index) {
    if(pad.index != this.playerId) {
      return; // Ignore other controllers
    }
    else if(button.index == 2) { // X
      if(this.activeTool != null) {
        this.useTool();
      }
    }
    else if(button.index == 0) { // A
      if(this.activeTool == null) {
        this.pickupTool(this.scene);
      } else {
        this.dropTool();
      }
    }
  }

  useTool() {
    if (this.activeTool != null) {
      this.scene.physics.overlap(this.activeTool, this.damageGroup, this.handleToolUse, null, this );
    }
  }

  pickupTool() {
    if (this.activeTool == null) {
      this.scene.physics.overlap(this, this.toolGroup, this.handleToolPickup, null, this );
    }
  }

  dropTool() {
    this.scene.add.existing(this.activeTool)
    this.remove(this.activeTool)
    this.activeTool.body.setSize();
    this.activeTool.body.setOffset(0, 0);
    this.activeTool.setPosition (this.x + this.body.width / 2, this.y + 20);
    this.scene.physics.overlap(this.activeTool, this.zoneGroup, this.handleToolZone, null, this );
    this.activeTool = null;
  }

  handleToolUse(tool, damage) {
    if (this.activeTool != null ) {
      if(damage.damageType.localeCompare(tool.toolType) == 0){
        tool.use();
        damage.repair();
      }
      if(damage.status <= 0) {
        damage.destroy();
      }
    }
  }

  handleToolPickup(player, tool) {
	  if (this.activeTool == null) {
	    this.add(tool);
	    this.activeTool = tool;
      this.activeTool.setPosition(this.body.width/2, -20);
      this.activeTool.body.setSize(this.body.width * 1.5,this.body.height*2)
      this.activeTool.body.setOffset(-this.body.width* 0.10 ,  this.body.height * 0.66)
    }
  }

  handleToolZone(tool, zone) {
    console.log("tool teleport detected");
    console.log(tool.parentContainer);
    zone.parentContainer.teleportTool(zone, tool);
  }

  generateAnimations() {
    this.scene.anims.create({
      key: 'walk-up',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 0, end: 23, first: 0 }),
      frameRate: 60,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-up-equipped',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 24, end: 47, first: 0 }),
      frameRate: 60,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-down-equipped',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 48, end: 71, first: 0 }),
      frameRate: 60,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-side',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 72, end: 95, first: 0 }),
      frameRate: 45,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-side-equipped',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 96, end: 119, first: 0 }),
      frameRate: 45,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-down',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 120, end: 143, first: 0 }),
      frameRate: 60,
      repeat: -1,
    });
  }

  debugDrawRoom(pos1, pos2) {
    var graphics = this.scene.add.graphics();
    graphics.lineStyle(4, 0x00ff00, 0.5);
    graphics.strokeRect(pos1[0], pos1[1], pos2[0], pos2[1]);

  }

  preUpdate(time, delta) {
    if(!this.pad) {
      this.pad = this.scene.input.gamepad.getPad(this.playerId);
      return;
    }

    let deltaX = this.speed * this.pad.axes[0].getValue();
    let deltaY = this.speed * this.pad.axes[1].getValue();

    this.body.setVelocityX(deltaX);
    this.body.setVelocityY(deltaY);

    let direction = 'none';
    if(Math.abs(deltaX) + Math.abs(deltaY) == 0) {
      direction = 'none';
    } else if(Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX < 0 ? 'left' : 'right';
    } else {
      direction = deltaY < 0 ? 'up' : 'down';
    }

    let animation = false;
    if(direction == 'down') {
      animation = this.activeTool == null ? 'walk-down' : 'walk-down-equipped';
    } else if(direction == 'up') {
      animation = this.activeTool == null ? 'walk-up' : 'walk-up-equipped';
    } else if(direction == 'right' || direction == 'left') {
      animation = this.activeTool == null ? 'walk-side' : 'walk-side-equipped';
    }

    if(animation == false) {
      this.playerSprite.anims.stop();
	  this.runningEmitter.frequency = -1;
    } else {
      if(!this.playerSprite.anims.isPlaying || this.playerSprite.anims.currentAnim.key !== animation) {
        this.playerSprite.flipX = direction == 'left';
        this.playerSprite.anims.play(animation);
		this.runningEmitter.frequency = 250;
      }
    }
  }
}

export default Player;
