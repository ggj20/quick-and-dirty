import Damage from './Damage';
import mapAreas from '../scenes/MapConfig';

class Fire extends Damage {
    constructor(scene, x, y, group, timeOut = 5000) {
        super(scene, x, y, group, 'FireSpriteSheet', 'EXTINGUISHER', 100,  { start: 0, end: 24 }, { start: 1, end: 24 }, 17);
        scene.sound.play('FireSound');
        setTimeout(() => this.spreadFire(timeOut), timeOut);
        this.group = group;
    }

    spreadFire(timeOut) {
        let chance = Math.random();
        if (chance <= this.scene.game.settings.fireSpreadChance) {
            let x = this.x + (Math.random() - 0.5) * 100;
            let y = this.y + (Math.random() - 0.5) * 100;
            let newTimeout = timeOut + timeOut * (Math.random() - 0.5) * 0.5;
            // do area check
            let areaFound = false;
            mapAreas.fireAreas.forEach(element => {
                if (element.xSource < x && (element.xSource+ element.xLength)> x){
                    if (element.ySource < y && (element.ySource+ element.yLength)> y){
                        let newFire = new Fire(this.scene,x , y, this.group, newTimeout);
                    }
                }
            });
        }
        setTimeout(() => this.spreadFire(timeOut), timeOut);
    }

}

export default Fire;
