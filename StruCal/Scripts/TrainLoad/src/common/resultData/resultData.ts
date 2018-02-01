import { TimeResult } from './timeResult';
import { TimeSettings } from '../time/timeSettings';



export interface ResultData {
    maxAbsoluteDisplacement: number;
    timeResults: Array<TimeResult>;
    timeSettings: TimeSettings;
}
