class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    scene.add.existing(this);

    this.playerSprite = scene.add.image(0, 0, 'PlayerSprite');
    this.add(this.playerSprite);
  }
}

export default Player;
