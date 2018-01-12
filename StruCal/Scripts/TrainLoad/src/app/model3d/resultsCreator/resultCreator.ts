import { StructureCreator } from '../structureCreator/structureCreator';
import { StructureData } from '../structureCreator/structureData';
import { ResultInterpolation } from './resultInterpolation';
import { DisplacementProvider } from './displacementProvider';
import { StressProvider } from './stressProvider';
import { mockedResultData } from '../../mocks/mockedResultData';
import { ResultData } from '../../resultData/resultData';




export class ResultCreator {
    private scene: any;

    private resultInterpolation: ResultInterpolation;
    private displacementProvider: DisplacementProvider;
    private stressProvider: StressProvider;

    constructor(scene: any) {
        this.scene = scene;
    }

    public SetResult(result: ResultData, structureData: StructureData): void {

        this.resultInterpolation = new ResultInterpolation(mockedResultData, 4);
        this.displacementProvider = new DisplacementProvider(this.scene, this.resultInterpolation, structureData);
        this.stressProvider = new StressProvider(this.scene, this.resultInterpolation, structureData);
    }

    public TickAnimation(time: number): void {
        this.resultInterpolation.setTime(time);
        this.displacementProvider.applyDisplacement();
        this.stressProvider.applyStress();
    }
}
