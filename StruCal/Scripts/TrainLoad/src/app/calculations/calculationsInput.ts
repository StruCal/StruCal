import { StructureGeometry } from '../structure/structureGeometry';
import { Point3D } from '../common/point3d';
import { MeshInput } from './meshInput';


export class CalculationsInput {
    structureGeometry: StructureGeometry;
    vertices: Array<MeshInput>;
    maxColor: string;
    minColor: string;
    middleColor: string;
}
