import Tool from './Tool';

class Hammer extends Tool {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }
    use() {
        console.log("used hammer!")
    }
}
  
export default Tool;
  