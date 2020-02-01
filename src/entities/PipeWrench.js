import Tool from './Tool';

class PipeWrench extends Tool {
    constructor(scene, x, y) {
        super(scene, x, y, 'PipeWrenchSprite', 'PIPE_WRENCH');
    }
    use() {
        //ToDo animation
    }
}

export default PipeWrench;
