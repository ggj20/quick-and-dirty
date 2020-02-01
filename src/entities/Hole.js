import Damage from './Damage';

class Hole extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'HoleSprite', 'HAMMER', 100);
    }
}

export default Hole;
