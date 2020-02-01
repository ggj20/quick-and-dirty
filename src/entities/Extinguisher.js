import Tool from './Tool';

class Extinguisher extends Tool {
    constructor(scene, x, y) {
        super(scene, x, y, 'ExtinguisherSprite', 'EXTINGUISHER');
    }
    use() {
        //ToDo animation
    }
}

export default Extinguisher;
