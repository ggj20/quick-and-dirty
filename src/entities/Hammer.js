import Tool from './Tool';

class Hammer extends Tool {
    constructor(scene, x, y, toolGroup) {
        super(scene, x, y, 'HammerSprite', 'HAMMER', toolGroup);
    }
    use() {
        //ToDo animation
    }
}

export default Hammer;
