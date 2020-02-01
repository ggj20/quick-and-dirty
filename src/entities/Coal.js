import Tool from './Tool';

class Coal extends Tool {
    constructor(scene, x, y) {
        super(scene, x, y, 'CoalSprite', 'COAL');
    }
    use() {
      return;
    }
}

export default Coal;
