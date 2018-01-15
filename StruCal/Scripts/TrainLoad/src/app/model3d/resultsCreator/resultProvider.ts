import { ResultData } from '../../resultData/resultData';
import { isEqual } from '../../common/equal';
import * as THREE from 'three';
import { MeshColorResult } from '../../resultData/meshColorResult';
import { VertexResult } from '../../resultData/vertexResult';
import { Point3D } from '../../common/point3d';



const linear = require('everpolate').linear;

function isEqualPoint(value1: Point3D, value2: any): boolean {
    const result = isEqual(value1.X, value2.x) && isEqual(value1.Y, value2.y) && isEqual(value1.Z, value2.z);
    return result;
}

export class ResultProvider {
    private resultData: ResultData;
    private meshResults: Map<string, VertexResult[]>;
    // private positions: Array<number>;
    // private displacements: Array<number>;
    // private topStresses: Array<number>;
    // private bottomStresses: Array<number>;

    public maxStress: number;
    public minStress: number;

    constructor(resultData: ResultData) {
        this.resultData = resultData;
    }

    public setTime(time: number): void {
        const currentResult = this.resultData.TimeResults
            .find(e => isEqual(e.Time, time));
        this.meshResults = new Map<string, VertexResult[]>();
        currentResult.MeshResults.forEach(value => {
            this.meshResults.set(value.MeshId, value.VertexResults);
        });

        // this.positions = currentResult.PositionResults.map(e => e.GlobalPosition);
        // this.displacements = currentResult.PositionResults.map(e => e.Displacement);
        // this.topStresses = currentResult.PositionResults.map(e => e.TopStress);
        // this.bottomStresses = currentResult.PositionResults.map(e => e.BottomStress);

        this.maxStress = currentResult.MaxStress;
        this.minStress = currentResult.MinStress;
    }

    public getDisplacement(position: any, meshId: string): number {
        const vertexResults = this.meshResults.get(meshId);
        const vertexResult = vertexResults.find(e => isEqualPoint(e.Position, position));
        if (vertexResult === undefined) {
            const d = vertexResults.find(e => isEqualPoint(e.Position, position));
        }
        const displacement = vertexResult.Displacement;
        

        return displacement * 100;
    }

    public getStress(position: number, elevation: number): number {
        // const topStress = linear([position], this.positions, this.topStresses);
        // const bottomStress = linear([position], this.positions, this.bottomStresses);
        // const stress = linear([elevation], [0, this.sectionHeight], [...bottomStress, ...topStress]);

        return 0;//stress[0];
    }
}
