class AltitudeIndicator extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    this.graphics = this.scene.add.graphics({
      lineStyle: { width: 4, color: 0xff0000 },
    });
  }

  preUpdate(time, delta) {
    this.line = new Phaser.Geom.Line(this.x, this.y, this.x, this.y - 40);
    this.line = Phaser.Geom.Line.RotateAroundXY(
      this.line,
      this.x,
      this.y,
      6.283185307 * (1 - this.scene.game.state.altitude / 100),
    );
    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);
  }
}

export default AltitudeIndicator;
