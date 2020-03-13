import Damage from './Damage';

class Electro extends Damage {
    constructor(scene, x, y, group) {
        super(scene, x, y, group, 'ElectroSpriteSheet', 'SOLDERING_IRON', 100,  { start: 0, end: 24}, { start: 0, end: 24 }, 48);
        scene.sound.play('ElectricSound');
    }
}

export default Electro;
