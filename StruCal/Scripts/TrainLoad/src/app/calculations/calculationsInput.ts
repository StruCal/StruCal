import { StructureGeometry } from '../structure/structureGeometry';
import { Point3D } from '../common/point3d';


export class CalculationsInput {
    StructureGeometry: StructureGeometry;
    Vertices: Array<Point3D>;
}
