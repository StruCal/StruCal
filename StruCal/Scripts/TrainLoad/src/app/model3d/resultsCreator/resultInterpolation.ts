import { ResultData } from '../../resultData/resultData';


const almostEqual = require('almost-equal');

const linear = require('everpolate').linear;


export class ResultInterpolation {
    sectionHeight: number;
    private resultData: ResultData;
    private positions: Array<number>;
    private displacements: Array<number>;
    private topStresses: Array<number>;
    private bottomStresses: Array<number>;

    public maxStress: number;
    public minStress: number;

    constructor(resultData: ResultData, sectionHeight: number) {
        this.resultData = resultData;
        this.sectionHeight = sectionHeight;
    }

    public setTime(time: number): void {
        const currentResult = this.resultData.TimeResults
            .find(e => almostEqual(e.Time, time, almostEqual.DBL_EPSILON, almostEqual.DBL_EPSILON));

        // this.positions = currentResult.PositionResults.map(e => e.GlobalPosition);
        // this.displacements = currentResult.PositionResults.map(e => e.Displacement);
        // this.topStresses = currentResult.PositionResults.map(e => e.TopStress);
        // this.bottomStresses = currentResult.PositionResults.map(e => e.BottomStress);

        this.maxStress = currentResult.MaxStress;
        this.minStress = currentResult.MinStress;
    }

    public getDisplacement(position: number): number {
        const displacement = linear([position], this.positions, this.displacements);
        return displacement[0] * 100;
    }

    public getStress(position: number, elevation: number): number {
        const topStress = linear([position], this.positions, this.topStresses);
        const bottomStress = linear([position], this.positions, this.bottomStresses);
        const stress = linear([elevation], [0, this.sectionHeight], [...bottomStress, ...topStress]);

        return stress[0];
    }
}
