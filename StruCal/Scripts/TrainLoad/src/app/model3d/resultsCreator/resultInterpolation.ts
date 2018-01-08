import { ResultData } from '../../resultData/resultData';


const almostEqual = require('almost-equal');

const linear = require('everpolate').linear;


export class ResultInterpolation {
    private resultData: ResultData;
    private positions: Array<number>;
    private displacements: Array<number>;

    constructor(resultData: ResultData) {
        this.resultData = resultData;
    }

    public setTime(time: number): void {
        const currentResult = this.resultData.TimeResults
            .find(e => almostEqual(e.Time, time, almostEqual.DBL_EPSILON, almostEqual.DBL_EPSILON));

        this.positions = currentResult.PositionResults.map(e => e.GlobalPosition);
        this.displacements = currentResult.PositionResults.map(e => e.Displacement);
    }

    public getDisplacement(position: number): number {
        const displacement = linear([position], this.positions, this.displacements);
        return displacement[0] * 100;
    }
}
