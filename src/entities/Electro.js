import Damage from './Damage';

class Electro extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'ElectroSprite', 'SOLDERING_IRON', 100);
    }
}

export default Electro;
