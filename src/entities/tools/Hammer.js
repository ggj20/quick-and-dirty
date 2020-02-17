import Tool from '../Tool';

class Hammer extends Tool {
  constructor(scene, x, y, toolGroup) {
    super(scene, x, y, 'HammerSprite', 'HAMMER', toolGroup);
    this.scene = scene;
  }
  use() {
    this.scene.sound.play('HammerSound');
    //ToDo animation
  }
}

export default Hammer;
