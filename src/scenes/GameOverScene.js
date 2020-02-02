import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene'
    })
  }

  preload() {
  }

  create() {
    this.make.text({
      x: this.game.config.width/2,
      y: 200,
      text: "Game Over",
      style: { font: "85px Arial", fill: "#C44", align: "center"},
      origin: { x: 0.5, y: 0.5 },
      add: true
    });

    this.make.text({
      x: this.game.config.width/2,
      y: 500,
      text: "Your Score: " + this.game.state.score,
      style: { font: "65px Arial", fill: "#CCC", align: "center"},
      origin: { x: 0.5, y: 0.5 },
      add: true
    });
  }
}

export default GameOverScene;
