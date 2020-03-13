import Damage from './Damage';

class Leak extends Damage {
    constructor(scene, x, y, group)  {
        super(scene, x, y, group, 'LeakSpriteSheet', 'PIPE_WRENCH', 100,  { start: 0, end: 34 }, { start: 0, end: 34, first: 1 }, 24);
        scene.sound.play('SteamSound');
    }
}

export default Leak;
