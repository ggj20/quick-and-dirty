import Damage from './Damage';

class Leak extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'LeakSprite', 'HAMMER', 100);
    }
}

export default Leak;
