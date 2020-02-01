import Coal from '../entities/Coal';

class CoalDispenser extends Phaser.GameObjects.Container {
  constructor(scene, x, y, toolGroup) {
    super(scene, x, y);
    scene.add.existing(this);
    this.toolGroup = toolGroup;

    this.zone = scene.add.zone(0, 0).setSize(50, 50);
    this.add(this.zone);
    scene.physics.world.enable(this.zone, 0);

    this.occupied = false;
    this.setSpawnTimer();
  }

  setSpawnTimer() {
    setTimeout(this.spawn.bind(this), this.scene.game.settings.coalSpawnDelay);
  }

  spawn() {
    if(this.occupied == false) {
      let coal = new Coal(this.scene, this.x, this.y);
      this.toolGroup.add(coal);
    }
    this.occupied = false;
    this.scene.physics.overlap(this.zone, this.toolGroup, this.handleOverlap, null, this);
    this.setSpawnTimer();
  }

  handleOverlap(zone, tool) {
    if(tool.toolType == 'COAL') {
      this.occupied = true;
    }
  }
}

export default CoalDispenser;
