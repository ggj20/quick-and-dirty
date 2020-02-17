import Tool from './Tool';

class Extinguisher extends Tool {
    constructor(scene, x, y, toolGroup) {
        super(scene, x, y, 'ExtinguisherSprite', 'EXTINGUISHER', toolGroup);
    }
    use() {
      scene.sound.play('FireExtinguisherSound');
        //ToDo animation
    }
}

export default Extinguisher;
