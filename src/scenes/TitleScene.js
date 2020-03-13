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
    this.sound.pauseOnBlur = false;

    this.sound.add('BeepSound');
    this.add.image(0, 0, 'InstructionsSprite').setOrigin(0, 0);

    this.playerTexts = [];
    this.game.players = [];

    for(let i = 0; i < this.game.settings.playerCount; i++) {
      this.playerTexts.push(this.createPlayerText(i));
    }

    this.game.airconsole.onMessage = this.onMessage.bind(this);

    // directly jump to game if debug true
    if(this.game.settings.debug) {
      this.scene.start('GameScene');
    }
  }

  onMessage(from, data) {
    if(data.element == 'ready' && data.data.pressed == true) {
      this.sound.play('BeepSound');
      this.game.players.push({id: from, ready: true});
      this.game.airconsole.message(from, {show_view_id: 'view-1'});
      this.playerTexts[this.game.players.length-1].setColor('#00CC00');
      this.playerTexts[this.game.players.length-1].setText(
        this.playerTexts[this.game.players.length-1].text.replace('⏳', '✔️')
      );
    }

    // Test if all players are ready
    if(this.game.players.length == this.game.settings.playerCount) {
      this.scene.start('GameScene');
      this.game.airconsole.broadcast({show_view_id: 'view-2'});
    }
  }

  createPlayerText(playerId) {
    return this.make.text({
      x: 100,
      y: 170 + 80 * playerId,
      text: "📱 Player " + (playerId + 1) + " ⏳",
      style: { font: "50px Arial", fill: "#EEE", align: "left"},
      add: true
    });
  }
}

export default TitleScene;
