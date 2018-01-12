import { StructureGeometry } from '../structure/structureGeometry';
import { Point3D } from '../common/point3d';
import { VertexInput } from './vertexInput';


export class CalculationsInput {
    StructureGeometry: StructureGeometry;
    Vertices: Array<VertexInput>;
}
