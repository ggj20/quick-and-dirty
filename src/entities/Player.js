class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, playerId, toolGroup, damageGroup, zoneGroup) {
    super(scene, x, y);
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
      key: 'walk-down',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 0, end: 23, first: 23 }),
      frameRate: 60,
      repeat: -1,
    });
    // #TODO: Add correct Frames
    this.scene.anims.create({
      key: 'walk-up',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 0, end: 23, first: 23 }),
      frameRate: 60,
      repeat: -1,
    });
    // #TODO: Add correct Frames
    this.scene.anims.create({
      key: 'walk-side',
      frames: this.scene.anims.generateFrameNumbers('PlayerSpriteSheet', { start: 0, end: 23, first: 23 }),
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

    if(direction == 'down') {
      if(!this.playerSprite.anims.isPlaying || this.playerSprite.anims.currentAnim.key !== 'walk-down') {
        this.playerSprite.anims.play('walk-down');
      }
    } else if(direction == 'up') {
      if(!this.playerSprite.anims.isPlaying || this.playerSprite.anims.currentAnim.key !== 'walk-up') {
        this.playerSprite.anims.play('walk-up');
      }
    } else if(direction == 'left') {
      if(!this.playerSprite.anims.isPlaying || this.playerSprite.anims.currentAnim.key !== 'walk-side') {
        this.playerSprite.anims.play('walk-side');
      }
    } else if(direction == 'right') {
      if(!this.playerSprite.anims.isPlaying || this.playerSprite.anims.currentAnim.key !== 'walk-side') {
        this.playerSprite.anims.play('walk-side');
        //sprite.flipX = (axisH > 0);
      }
    } else {
      this.playerSprite.anims.stop();
    }

    this.x += deltaX;
    this.y += deltaY;
  }
}

export default Player;
