import Tool from './Tool';

class Hammer extends Tool {
    constructor(scene, x, y, toolGroup) {
        super(scene, x, y, 'HammerSprite', 'HAMMER', toolGroup);
    }
    use() {
      scene.sound.play('HammerSound');
        //ToDo animation
    }
}

export default Hammer;
