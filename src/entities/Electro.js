import Damage from './Damage';

class Electro extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'ElectroSpriteSheet', 'SOLDERING_IRON', 100,  { start: 0, end: 24}, { start: 0, end: 24 }, 48);
    }
}

export default Electro;
