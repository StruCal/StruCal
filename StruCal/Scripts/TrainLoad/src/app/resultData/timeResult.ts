import { MeshColorResult } from './meshColorResult';


export interface TimeResult {
    Time: number;
    MaxStress: number;
    MinStress: number;
    MeshResults: Array<MeshColorResult>;
}
