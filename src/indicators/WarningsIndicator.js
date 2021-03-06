import countDamagesByToolType from '../utils/count-damages-by-tool-type';

const offsetX = 10;
const offsetY = 40;
const sizeY = 150;

const getPositionY = index => offsetY + index * sizeY;

let blinkTrigger = false;

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
    // Switch blink trigger state
    blinkTrigger = !blinkTrigger;

    const { voltage, altitude } = this.scene.game.state;
    const fireCount = countDamagesByToolType(this.scene, 'EXTINGUISHER');
    const holeCount = countDamagesByToolType(this.scene, 'HAMMER');
    const leakCount = countDamagesByToolType(this.scene, 'PIPE_WRENCH');
    const sparkCount = countDamagesByToolType(this.scene, 'SOLDERING_IRON');

    this.warningIndicatorAltitude.alpha = holeCount - 2;
    this.warningIndicatorElectricity.alpha = sparkCount - 2;
    this.warningIndicatorFire.alpha = fireCount - 5;
    this.warningIndicatorSteam.alpha = leakCount - 2;

    // Blink if you get close to losing - ALARM!
    if (altitude < 37.5) {
      this.warningIndicatorAltitude.alpha = blinkTrigger;
    }
    if (voltage < 50) {
      this.warningIndicatorElectricity.alpha = blinkTrigger;
    }
    if (fireCount > 15) {
      this.warningIndicatorFire.alpha = blinkTrigger;
    }

    if (this.scene.game.settings.debug) {
      console.log('---');
      console.log('fire', fireCount);
      console.log('altitude', holeCount, altitude);
      console.log('steam', leakCount);
      console.log('voltage', sparkCount, voltage);
    }
  }
}
