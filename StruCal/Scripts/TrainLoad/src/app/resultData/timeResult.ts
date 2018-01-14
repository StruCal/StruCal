import { MeshColorResult } from './meshColorResult';


export interface TimeResult {
    Time: number;
    MaxStress: number;
    MinStress: number;
    PositionResults: Array<MeshColorResult>;
}
