import { MovingForce } from './movingForce';



export class MovingLoad {
    speed: number;
    forces: Array<MovingForce>;

    public getLength() {
        const xs = this.forces.map(e => e.basePosition);
        const maxX = Math.max(...xs);
        const minX = Math.min(...xs);
        const length = maxX - minX;
        return length;
    }
}
