import Damage from './Damage';

class Leak extends Damage {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, 'HAMMER', 100);
        this.damagename = "leak"
    }
    repair() {
        var d = new Date();
        var acutalRepair = d.getTime();
        if(this.lastRepair + this.repairDebounce < acutalRepair) {
            this.status -= 10;
            this.setStatusBar();
            this.lastRepair = acutalRepair;
        }
    }
}
  
export default Leak;
  