class Player extends Phaser.GameObjects.Container {
  constructor(
    scene,
    pos1,
    pos2,
    characterSpriteSheetNr,
    playerId,
    toolGroup,
    damageGroupColliding,
    damageGroupNotColliding,
    zoneGroup,
    runningEmitter,
  ) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.characterSpriteSheetNr = characterSpriteSheetNr;
    this.spriteSheet = 'Character' + characterSpriteSheetNr + 'SpriteSheet';

    this.playerId = playerId;

    this.speed = this.scene.game.settings.playerSpeed;
    this.direction = new Phaser.Math.Vector2(0, 0);

    this.generateAnimations();
    this.playerSprite = scene.add
      .sprite(0, 0, this.spriteSheet)
      .setOrigin(0.1, 0.5);
    this.add(this.playerSprite);

    this.scene.physics.world.enable(this);

    this.playerText = scene.make.text({
      x: this.playerSprite.width / 2 - 8,
      y: -this.playerSprite.height,
      text: 'Player ' + characterSpriteSheetNr,
      style: { align: 'center' },
      origin: { x: 0.5, y: 0 },
    });
    this.add(this.playerText);

    scene.physics.world.enable(this);
    this.body.setSize(
      this.playerSprite.width * 0.8,
      this.playerSprite.height / 2,
    );

    this.body.setCollideWorldBounds(true);
    this.body.setBoundsRectangle(
      new Phaser.Geom.Rectangle(pos1[0], pos1[1], pos2[0], pos2[1]),
    );
    this.setPosition(
      pos1[0] + pos2[0] / 2 - this.playerSprite.width / 2,
      pos1[1] + pos2[1] / 2 - this.playerSprite.height / 2,
    );
    this.toolGroup = toolGroup;
    this.damageGroupColliding = damageGroupColliding;
    this.damageGroupNotColliding = damageGroupNotColliding;
    this.zoneGroup = zoneGroup;

    this.activeTool = null;
    if (this.scene.game.settings.debug) {
      this.debugDrawRoom(pos1, pos2);
    }

    this.runningEmitter = runningEmitter;
    this.runningEmitter.follow = this;
    this.runningEmitter.followOffset.x = this.playerSprite.width / 2 - 8;
    this.runningEmitter.followOffset.y = this.playerSprite.height / 2 - 6;
  }

  pickUpDropTool() {
    if (this.activeTool == null) {
      this.pickupTool(this.scene);
    } else {
      this.dropTool();
    }
  }

  applyDirection(dir, pressed) {
    if (dir == 'left' && pressed == true) {
      this.direction.x = -1;
    } else if (dir == 'right' && pressed == true) {
      this.direction.x = 1;
    } else if (dir == 'up' && pressed == true) {
      this.direction.y = -1;
    } else if (dir == 'down' && pressed == true) {
      this.direction.y = 1;
    } else if (dir == 'left' && pressed == false && this.direction.x < 0) {
      this.direction.x = 0;
    } else if (dir == 'right' && pressed == false && this.direction.x > 0) {
      this.direction.x = 0;
    } else if (dir == 'up' && pressed == false && this.direction.y < 0) {
      this.direction.y = 0;
    } else if (dir == 'down' && pressed == false && this.direction.y > 0) {
      this.direction.y = 0;
    }

    if (this.direction.length() == 0) {
      this.body.velocity.set(0);
    } else {
      this.scene.physics.velocityFromAngle(
        Phaser.Math.RadToDeg(this.direction.angle()),
        this.speed,
        this.body.velocity,
      );
    }
    this.updateAnimation();
  }

  useTool() {
    if (this.activeTool != null) {
      this.scene.physics.overlap(
        this.activeTool,
        this.damageGroupColliding,
        this.handleToolUse,
        null,
        this,
      );
      this.scene.physics.overlap(
        this.activeTool,
        this.damageGroupNotColliding,
        this.handleToolUse,
        null,
        this,
      );
    }
  }

  pickupTool() {
    if (this.activeTool == null) {
      this.scene.physics.overlap(
        this,
        this.toolGroup,
        this.handleToolPickup,
        null,
        this,
      );
    }
  }

  dropTool() {
    if (this.activeTool) {
      this.scene.sound.play('ItemDropSound');
    }
    this.scene.add.existing(this.activeTool);
    this.remove(this.activeTool);
    this.activeTool.body.setSize();
    this.activeTool.body.setOffset(0, 0);
    this.activeTool.setPosition(this.x + this.body.width / 2, this.y + 20);
    this.scene.physics.overlap(
      this.activeTool,
      this.zoneGroup,
      this.handleToolZone,
      null,
      this,
    );
    this.activeTool = null;
  }

  handleToolUse(tool, damage) {
    if (this.activeTool != null) {
      if (damage.damageType.localeCompare(tool.toolType) == 0) {
        tool.use();
        damage.repair();
      }
      if (damage.status <= 0) {
        damage.destroy();
      }
    }
  }

  handleToolPickup(player, tool) {
    if (this.activeTool == null) {
      this.add(tool);
      this.scene.sound.play('ItemPickUpSound');
      this.activeTool = tool;
      this.activeTool.setPosition(this.body.width / 2, -20);
      this.activeTool.body.setSize(this.body.width * 1.5, this.body.height * 2);
      this.activeTool.body.setOffset(
        -this.body.width * 0.1,
        this.body.height * 0.66,
      );
    }
  }

  handleToolZone(tool, zone) {
    console.log('tool teleport detected');
    console.log(tool.parentContainer);
    zone.parentContainer.teleportTool(zone, tool);
  }

  generateAnimations() {
    this.scene.anims.create({
      key: 'walk-up' + this.characterSpriteSheetNr,
      frames: this.scene.anims.generateFrameNumbers(this.spriteSheet, {
        start: 0,
        end: 23,
        first: 0,
      }),
      frameRate: 60,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-up-equipped' + this.characterSpriteSheetNr,
      frames: this.scene.anims.generateFrameNumbers(this.spriteSheet, {
        start: 24,
        end: 47,
        first: 0,
      }),
      frameRate: 60,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-down-equipped' + this.characterSpriteSheetNr,
      frames: this.scene.anims.generateFrameNumbers(this.spriteSheet, {
        start: 48,
        end: 71,
        first: 0,
      }),
      frameRate: 60,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-side' + this.characterSpriteSheetNr,
      frames: this.scene.anims.generateFrameNumbers(this.spriteSheet, {
        start: 72,
        end: 95,
        first: 0,
      }),
      frameRate: 45,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-side-equipped' + this.characterSpriteSheetNr,
      frames: this.scene.anims.generateFrameNumbers(this.spriteSheet, {
        start: 96,
        end: 119,
        first: 0,
      }),
      frameRate: 45,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'walk-down' + this.characterSpriteSheetNr,
      frames: this.scene.anims.generateFrameNumbers(this.spriteSheet, {
        start: 120,
        end: 143,
        first: 0,
      }),
      frameRate: 60,
      repeat: -1,
    });
  }

  updateAnimation() {
    let direction = 'none';
    if (Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y) == 0) {
      direction = 'none';
    } else if (
      Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)
    ) {
      direction = this.body.velocity.x < 0 ? 'left' : 'right';
    } else {
      direction = this.body.velocity.y < 0 ? 'up' : 'down';
    }

    let animation = false;
    if (direction == 'down') {
      animation =
        this.activeTool == null
          ? 'walk-down' + this.characterSpriteSheetNr
          : 'walk-down-equipped' + this.characterSpriteSheetNr;
    } else if (direction == 'up') {
      animation =
        this.activeTool == null
          ? 'walk-up' + this.characterSpriteSheetNr
          : 'walk-up-equipped' + this.characterSpriteSheetNr;
    } else if (direction == 'right' || direction == 'left') {
      animation =
        this.activeTool == null
          ? 'walk-side' + this.characterSpriteSheetNr
          : 'walk-side-equipped' + this.characterSpriteSheetNr;
    }

    if (animation == false) {
      this.playerSprite.anims.stop();
      this.runningEmitter.frequency = -1;
    } else {
      if (
        !this.playerSprite.anims.isPlaying ||
        this.playerSprite.anims.currentAnim.key !== animation
      ) {
        this.playerSprite.flipX = direction == 'left';
        this.playerSprite.anims.play(animation);
        this.runningEmitter.frequency = 150;
      }
    }
  }

  debugDrawRoom(pos1, pos2) {
    var graphics = this.scene.add.graphics();
    graphics.lineStyle(4, 0x00ff00, 0.5);
    graphics.strokeRect(pos1[0], pos1[1], pos2[0], pos2[1]);
  }

  preUpdate(time, delta) {}
}

export default Player;
