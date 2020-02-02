import Damage from './Damage';

class Fire extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'FireSpriteSheet', 'EXTINGUISHER', 100,  { start: 0, end: 24 }, { start: 1, end: 24 }, 17);
    }
}

export default Fire;
