import Damage from './Damage';

class Leak extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'LeakSpriteSheet', 'PIPE_WRENCH', 100,  { start: 0, end: 34 }, { start: 0, end: 34, first: 1 }, 24);
    }
}

export default Leak;
