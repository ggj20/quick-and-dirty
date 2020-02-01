import Damage from './Damage';

class Fire extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'FireSprite', 'EXTINGUISHER', 100);
    }
}

export default Fire;
