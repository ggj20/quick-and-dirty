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

  create() {
    this.clearAllTimeouts();

    this.add.image(0, 0, 'GameOverSprite').setOrigin(0, 0);
    this.make.text({
      x: this.game.config.width - 800,
      y: 750,
      text: 'Game Over',
      style: { font: '85px Arial', fill: '#C22', align: 'center' },
      origin: { x: 0, y: 0.5 },
      add: true,
    });

    this.make.text({
      x: this.game.config.width - 800,
      y: 850,
      text: 'Your Score: ' + Math.round(this.game.state.score),
      style: { font: '65px Arial', fill: '#CCC', align: 'center' },
      origin: { x: 0, y: 0.5 },
      add: true,
    });
  }
}

export default GameOverScene;
