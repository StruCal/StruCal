import { TimeResult } from './timeResult';



export interface ResultData {
    MaxStress: number;
    MinStress: number;
    MaxAbsoluteDisplacement: number;
    TimeResults: Array<TimeResult>;
}
