import { StructureCreator } from '../structureCreator/structureCreator';
import { StructureData } from '../structureCreator/structureData';
import { ResultProvider } from './resultProvider';
import { DisplacementProvider } from './displacementProvider';
import { StressProvider } from './stressProvider';
import { ResultData } from '../../../common/resultData/resultData';


export class ResultCreator {
    private scene: any;

    private resultProvider: ResultProvider;
    private displacementProvider: DisplacementProvider;
    private stressProvider: StressProvider;

    constructor(scene: any) {
        this.scene = scene;
    }

    public setResult(result: ResultData, structureData: StructureData): void {

        this.resultProvider = new ResultProvider(result);
        this.displacementProvider = new DisplacementProvider(this.scene, this.resultProvider, structureData);
        this.stressProvider = new StressProvider(this.scene, this.resultProvider, structureData);
    }

    public tickAnimation(time: number): void {
        this.resultProvider.setTime(time);
        this.displacementProvider.applyDisplacement();
        this.stressProvider.applyStress();
    }
}
