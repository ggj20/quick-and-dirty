import Damage from './Damage';

class Leak extends Damage {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, "hammer");
        this.damagename = "leak"
    }
    repair() {
        console.log("used hammer to repair leak!")
    }
}
  
export default Leak;
  