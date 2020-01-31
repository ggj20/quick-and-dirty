class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, playerId) {
    super(scene, x, y);
    scene.add.existing(this);

    this.playerId = playerId;
    this.speed = 0.2;

    this.playerSprite = scene.add.image(0, 0, 'PlayerSprite');
    this.add(this.playerSprite);
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
