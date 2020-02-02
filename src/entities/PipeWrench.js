import Tool from './Tool';

class PipeWrench extends Tool {
    constructor(scene, x, y, toolGroup) {
        super(scene, x, y, 'PipeWrenchSprite', 'PIPE_WRENCH', toolGroup);
    }
    use() {
        //ToDo animation
    }
}

export default PipeWrench;
