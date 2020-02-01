import Tool from './Tool';

class Hammer extends Tool {
    constructor(scene, x, y) {
        super(scene, x, y, 'HammerSprite', 'HAMMER');
    }
    use() {
        //ToDo animation
    }
}

export default Hammer;
