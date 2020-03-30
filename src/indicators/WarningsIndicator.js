export default class WarningsIndicator extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    scene.add.existing(this);

    this.update();
    setInterval(() => this.update(), 500);
  }

  countDamagesByToolType(toolType) {
    const performCount = array =>
      array.filter(d => d.damageType === toolType).length;
    const { damageGoupColliding, damageGroupNotColliding } = this.scene;
    return (
      performCount(damageGoupColliding.children.entries) +
      performCount(damageGroupNotColliding.children.entries)
    );
  }

  update() {
    const { voltage, altitude } = this.scene.game.state;

    const fireCount = this.countDamagesByToolType('EXTINGUISHER');
    const holeCount = this.countDamagesByToolType('HAMMER');
    const leakCount = this.countDamagesByToolType('PIPE_WRENCH');
    const sparkCount = this.countDamagesByToolType('SOLDERING_IRON');

    console.log('---');
    console.log('fire', fireCount);
    console.log('altitude', holeCount, altitude);
    console.log('steam', leakCount);
    console.log('voltage', sparkCount, voltage);
  }
}
