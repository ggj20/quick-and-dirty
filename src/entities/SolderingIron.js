import Tool from './Tool';

class SolderingIron extends Tool {
    constructor(scene, x, y, toolGroup) {
        super(scene, x, y, 'SolderingIronSprite', 'SOLDERING_IRON', toolGroup);
    }
    use() {
      scene.sound.play('SolderingIronSound');
        //ToDo animation
    }
}

export default SolderingIron;
