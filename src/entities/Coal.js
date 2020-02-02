import Tool from './Tool';

class Coal extends Tool {
    constructor(scene, x, y, toolGroup) {
      super(scene, x, y, 'CoalSprite', 'COAL', toolGroup);
    }
    use() {
      return;
    }
}

export default Coal;
