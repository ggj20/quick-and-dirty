class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, playerId) {
    super(scene, x, y);
    scene.add.existing(this);

    this.playerId = playerId;
    this.playerSprite = scene.add.image(0, 0, 'PlayerSprite');
    this.add(this.playerSprite);
  }
}

export default Player;
