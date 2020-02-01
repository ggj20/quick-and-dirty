import Tool from './Tool';

class Hammer extends Tool {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, "hammer");
    }
    use() {
        //ToDo animation
    }
}
  
export default Hammer;
  