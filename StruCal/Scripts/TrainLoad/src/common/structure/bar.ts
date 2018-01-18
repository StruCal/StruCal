import { Section } from './section';
import { Additional } from './additional';
import { Point3D } from '../utils/point3d';

const Guid = require('guid');

export class Bar {
    readonly id: string;
    section: Section;
    startPoint: Point3D;
    endPoint: Point3D;
    additionals?: Array<Additional>;

    constructor() {
        this.id = Guid.raw();
    }

    getLength(): number {
        const dx = this.startPoint.x - this.endPoint.x;
        const dy = this.startPoint.y - this.endPoint.y;
        const dz = this.startPoint.z - this.endPoint.z;
        const result = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return result;
    }
}
