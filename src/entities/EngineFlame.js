class EngineFlame extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    this.createEmitter();
  }

  createEmitter() {
    this.emitter = this.scene.add.particles('EngineFlameParticle').createEmitter({
      x: this.x,
      y: this.y,
      speed: 0,
      angle: 180,
      scale: { start: 0, end: 0.9 },
      alpha: { start: 1, end: 0.1 },
      blendMode: 'NORMAL',
      frequency: 250,
      active: true,
      lifespan: 1000,
      quantity: 1,
    });
  }

  preUpdate(time, delta) {
    this.emitter.scaleX.end = 1.5 * (this.scene.game.state.speed / this.scene.game.settings.maxShipSpeed);
  }
}

export default EngineFlame;
