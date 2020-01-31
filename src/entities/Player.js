class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, playerId) {
    super(scene, x, y);
    scene.add.existing(this);

    this.playerId = playerId;
    this.speed = 0.2;

    this.playerSprite = scene.add.image(0, 0, 'PlayerSprite');
    this.add(this.playerSprite);

    this.playerText = scene.add.text(-this.playerSprite.width, -this.playerSprite.height, 'Player ' + (this.playerId + 1), {fixedWidth: this.playerSprite.width * 2, align: 'center'});
    this.add(this.playerText);

    scene.input.gamepad.on('down', this.onButtonPress, this);

    this.tool = null;
  }

  onButtonPress(pad, button, index) {
    if(pad.index != this.playerId) {
      return; // Ignore other controllers
    }
    else if(button.index == 2) { // X
      if(this.tool != null) {
        this.useTool();
      }
    }
    else if(button.index == 0) { // A
      if(this.tool == null) {
        this.pickupTool();
      } else {
        this.dropTool();
      }
    }
  }

  useTool() {
    console.log(this.playerId, 'use tool');
  }

  dropTool() {
    console.log(this.playerId, 'drop tool');
  }

  pickupTool() {
    console.log(this.playerId, 'pickup tool');
  }

  preUpdate(time, delta) {
    let pad = this.scene.input.gamepad.getPad(this.playerId);
    if(!pad) {
      return;
    }

    this.x += delta * this.speed * pad.axes[0].getValue();
    this.y += delta * this.speed * pad.axes[1].getValue();
    //sprite.flipX = (axisH > 0);
  }
}

export default Player;
