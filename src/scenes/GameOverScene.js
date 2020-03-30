import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene',
    });
  }

  preload() {}

  clearAllTimeouts() {
    const lastTimeoutId = setTimeout(() => {}, 0);

    for (let id = 0; id <= lastTimeoutId; id++) {
      clearTimeout(id);
    }
  }

  onMessage(from, data) {
    switch (data.element) {
      case 'tryAgain':
        return this.playGameAgain();
      default:
        return console.log('Unknown command from airconsole', from, data);
    }
  }

  playGameAgain() {
    console.log('Play again, loading game scene.');

    this.game.state = {
      score: 0,
      altitude: 100,
      speed: 0,
      engineTemperature: 3,
      engineEfficency: 0.75,
      voltage: 100,
    };

    this.scene.start('GameScene');
    this.game.airconsole.broadcast({ show_view_id: 'view-2' });
  }

  create() {
    this.clearAllTimeouts();

    this.add.image(0, 0, 'GameOverSprite').setOrigin(0, 0);

    this.make.text({
      x: 1480,
      y: 900,
      text: 'Your Score',
      style: { font: '65px Arial', fill: '#CCC', align: 'center' },
      origin: { x: 0, y: 0.5 },
      add: true,
    });

    this.make.text({
      x: 1480,
      y: 980,
      text: Math.round(this.game.state.score),
      style: { font: '65px Arial', fill: '#CCC', align: 'center' },
      origin: { x: 0, y: 0.5 },
      add: true,
    });

    this.game.airconsole.onMessage = this.onMessage.bind(this);
  }
}

export default GameOverScene;
