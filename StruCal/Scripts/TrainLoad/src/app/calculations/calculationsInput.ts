import { StructureGeometry } from '../structure/structureGeometry';
import { Point3D } from '../common/point3d';
import { MeshInput } from './meshInput';
import { MovingLoad } from '../movingLoad/movingLoad';
import { TimeSettings } from '../time/timeSettings';


export class CalculationsInput {
    structureGeometry: StructureGeometry;
    movingLoads: MovingLoad;
    vertices: Array<MeshInput>;
    maxColor: string;
    minColor: string;
    middleColor: string;
    timeSettings: TimeSettings;
}
