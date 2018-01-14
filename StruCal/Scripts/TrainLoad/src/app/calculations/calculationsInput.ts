import { StructureGeometry } from '../structure/structureGeometry';
import { Point3D } from '../common/point3d';
import { MeshInput } from './meshInput';


export class CalculationsInput {
    StructureGeometry: StructureGeometry;
    Vertices: Array<MeshInput>;
    MaxColor: string;
    MinColor: string;
}
