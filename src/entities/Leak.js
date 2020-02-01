import Damage from './Damage';

class Leak extends Damage {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, "hammer");
        this.damagename = "leak"
    }
    repair() {
        this.status -= 10;
        this.setStatusBar();
    }
}
  
export default Leak;
  