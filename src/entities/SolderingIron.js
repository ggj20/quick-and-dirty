import Tool from './Tool';

class SolderingIron extends Tool {
    constructor(scene, x, y) {
        super(scene, x, y, 'SolderingIronSprite', 'SOLDERING_IRON');
    }
    use() {
        //ToDo animation
    }
}

export default SolderingIron;
