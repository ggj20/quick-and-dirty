import countDamagesByToolType from '../utils/count-damages-by-tool-type';

const offsetX = 10;
const offsetY = 40;
const sizeY = 150;

const getPositionY = index => offsetY + index * sizeY;

export default class WarningsIndicator extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    scene.add.existing(this);

    this.warningIndicatorAltitude = this.scene.add.image(
      offsetX,
      getPositionY(1),
      'WarningAltitudeIcon',
    );
    this.warningIndicatorAltitude.tint = 0xff0000;
    this.warningIndicatorElectricity = this.scene.add.image(
      offsetX,
      getPositionY(2),
      'WarningElectricityIcon',
    );
    this.warningIndicatorElectricity.tint = 0xff0000;
    this.warningIndicatorFire = this.scene.add.image(
      offsetX,
      getPositionY(3),
      'WarningFireIcon',
    );
    this.warningIndicatorFire.tint = 0xff0000;
    this.warningIndicatorSteam = this.scene.add.image(
      offsetX,
      getPositionY(4),
      'WarningSteamIcon',
    );
    this.warningIndicatorSteam.tint = 0xff0000;

    this.update();
    setInterval(() => this.update(), 500);
  }

  update() {
    const { voltage, altitude } = this.scene.game.state;
    const fireCount = countDamagesByToolType(this.scene, 'EXTINGUISHER');
    const holeCount = countDamagesByToolType(this.scene, 'HAMMER');
    const leakCount = countDamagesByToolType(this.scene, 'PIPE_WRENCH');
    const sparkCount = countDamagesByToolType(this.scene, 'SOLDERING_IRON');

    this.warningIndicatorAltitude.alpha = holeCount - 3;
    this.warningIndicatorElectricity.alpha = sparkCount - 3;
    this.warningIndicatorFire.alpha = fireCount - 5;
    this.warningIndicatorSteam.alpha = leakCount - 3;

    console.log('---');
    console.log('fire', fireCount);
    console.log('altitude', holeCount, altitude);
    console.log('steam', leakCount);
    console.log('voltage', sparkCount, voltage);
  }
}
