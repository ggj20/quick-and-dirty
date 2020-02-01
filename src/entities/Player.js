class Player extends Phaser.GameObjects.Container {
  constructor(scene, pos1, pos2, playerId, toolGroup, damageGroup, zoneGroup) {
    super(scene, pos1[0] + (pos2[0]-pos1[0]) / 2, pos1[1] + (pos2[1]-pos1[1]) / 2);

    scene.add.existing(this);
    this.playerId = playerId;


    this.speed = this.scene.game.settings.playerSpeed;

    this.generateAnimations();
    this.playerSprite = scene.add.sprite(0, 0, 'PlayerSpriteSheet');
    this.add(this.playerSprite);

    this.scene.physics.world.enable(this)

    this.playerText = scene.add.text(-this.playerSprite.width, -this.playerSprite.height, 'Player ' + (this.playerId + 1), {fixedWidth: this.playerSprite.width * 2, align: 'center'});
    this.add(this.playerText);

    scene.input.gamepad.on('down', this.onButtonPress, this);
	scene.physics.world.enable(this);
	this.body.setSize(this.playerSprite.width,this.playerSprite.height);

	this.body.setCollideWorldBounds(true);
    this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(pos1[0], pos1[1], pos2[0], pos2[1]));


    this.toolGroup = toolGroup;
    this.damageGroup = damageGroup;
    this.zoneGroup = zoneGroup;

    this.activeTool = null;
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
    this.activeTool.setPosition (this.x, this.y);
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
    this.add(tool);
    this.activeTool = tool;
    this.activeTool.setPosition (0, 0);
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

  preUpdate(time, delta) {
    if(!this.pad) {
      this.pad = this.scene.input.gamepad.getPad(this.playerId);
      return;
    }

    let deltaX = delta * this.speed * this.pad.axes[0].getValue();
    let deltaY = delta * this.speed * this.pad.axes[1].getValue();

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
    } else {
      if(!this.playerSprite.anims.isPlaying || this.playerSprite.anims.currentAnim.key !== animation) {
        this.playerSprite.flipX = direction == 'left';
        this.playerSprite.anims.play(animation);
      }
    }

    this.x += deltaX;
    this.y += deltaY;
  }
}

export default Player;
