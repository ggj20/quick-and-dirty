import Damage from './Damage';

class Hole extends Damage {
    constructor(scene, x, y) {
        super(scene, x, y, 'HoleSpriteSheet', 'HAMMER', 100,  { start: 0, end: 33, first: 0 }, { start: 33, end: 33 }, 17);
        scene.sound.play('HoleSound');
    }
}

export default Hole;
