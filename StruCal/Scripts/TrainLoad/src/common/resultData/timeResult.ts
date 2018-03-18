import { MeshColorResult } from './meshColorResult';


export interface TimeResult {
    time: number;
    acceleration: number;
    meshResults: Array<MeshColorResult>;
}
