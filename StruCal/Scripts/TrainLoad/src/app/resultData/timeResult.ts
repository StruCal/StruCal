import { PositionResult } from './positionResult';


export interface TimeResult {
    Time: number;
    MaxStress: number;
    MinStress: number;
    PositionResults: Array<PositionResult>;
}
