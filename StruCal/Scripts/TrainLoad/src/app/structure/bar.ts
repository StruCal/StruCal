import { Section } from './section';
import { Point3D } from '../common/point3d';
import { Additional } from './additional';

export class Bar {
    Id: string;
    Section: Section;
    StartPoint: Point3D;
    EndPoint: Point3D;
    Additionals?: Array<Additional>;

    getLength(): number {
        const dx = this.StartPoint.X - this.EndPoint.X;
        const dy = this.StartPoint.Y - this.EndPoint.Y;
        const dz = this.StartPoint.Z - this.EndPoint.Z;
        const result = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return result;
    }
}
