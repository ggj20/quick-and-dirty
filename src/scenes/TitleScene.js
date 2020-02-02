import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    })
  }

  preload() {
    console.log('loading title');
  }

  create() {
    this.make.text({
      x: this.game.config.width/2,
      y: 100,
      text: "Press any button to start",
      style: { font: "65px Arial", fill: "#CCC", align: "center"},
      origin: { x: 0.5, y: 0.5 },
      add: true
    });

    this.readyStates = [];
    this.playerTexts = [];

    for(let i = 0; i < this.game.settings.playerCount; i++) {
      this.playerTexts.push(this.createPlayerText(i));
      this.readyStates.push(false);
    }

    this.input.gamepad.on('down', this.onButtonPress, this);

    // directly jump to game if debug true
    if(this.game.settings.debug) {
      this.scene.start('GameScene');
    }
  }

  onButtonPress(pad, button, index) {
    this.playerTexts[pad.index].setColor('#00CC00');
    this.readyCount++;
    this.readyStates[pad.index] = true;

    // Test if all players are ready
    if(this.readyStates.reduce((a, b) => {return a && b}, true)) {
      this.scene.start('GameScene');
    }
  }

  createPlayerText(playerId) {
    return this.make.text({
      x: 100,
      y: 400 + 100 * playerId,
      text: "Player " + (playerId + 1),
      style: { font: "50px Arial", fill: "#CCC", align: "left"},
      add: true
    });
  }
}

export default TitleScene;
