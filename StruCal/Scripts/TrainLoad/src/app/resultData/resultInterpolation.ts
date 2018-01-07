import { ResultData } from '../resultData/resultData';
const almostEqual = require('almost-equal');

const linear = require('everpolate').linear;


export class ResultInterpolation {
    private resultData: ResultData;
    private x: Array<number>;
    private y: Array<number>;

    constructor(resultData: ResultData) {
        this.resultData = resultData;
    }

    public setTime(time: number): void {
        const currentResult = this.resultData.TimeResults
            .find(e => almostEqual(e.Time, time, almostEqual.DBL_EPSILON, almostEqual.DBL_EPSILON));

        this.x = currentResult.PositionResults.map(e => e.GlobalPosition);
        this.y = currentResult.PositionResults.map(e => e.Displacement);
    }

    public getDisplacement(x: number): number {
        const displacement = linear([x], this.x, this.y);
        return displacement[0] * 10000;
    }
}
