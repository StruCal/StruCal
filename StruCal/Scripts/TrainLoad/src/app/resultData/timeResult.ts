import { MeshColorResult } from './meshColorResult';


export interface TimeResult {
    time: number;
    maxStress: number;
    minStress: number;
    meshResults: Array<MeshColorResult>;
}
