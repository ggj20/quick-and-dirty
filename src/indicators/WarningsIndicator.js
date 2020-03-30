import countDamagesByToolType from '../utils/count-damages-by-tool-type';

export default class WarningsIndicator extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    scene.add.existing(this);

    this.update();
    setInterval(() => this.update(), 500);
  }

  update() {
    const { voltage, altitude } = this.scene.game.state;

    const fireCount = countDamagesByToolType(this.scene, 'EXTINGUISHER');
    const holeCount = countDamagesByToolType(this.scene, 'HAMMER');
    const leakCount = countDamagesByToolType(this.scene, 'PIPE_WRENCH');
    const sparkCount = countDamagesByToolType(this.scene, 'SOLDERING_IRON');

    console.log('---');
    console.log('fire', fireCount);
    console.log('altitude', holeCount, altitude);
    console.log('steam', leakCount);
    console.log('voltage', sparkCount, voltage);
  }
}
