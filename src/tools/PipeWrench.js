import Tool from './Tool';

class PipeWrench extends Tool {
  constructor(scene, x, y, toolGroup) {
    super(scene, x, y, 'PipeWrenchSprite', 'PIPE_WRENCH', toolGroup);
    this.scene = scene;
  }
  use() {
    this.scene.sound.play('WrenchSound');
    //ToDo animation
  }
}

export default PipeWrench;
