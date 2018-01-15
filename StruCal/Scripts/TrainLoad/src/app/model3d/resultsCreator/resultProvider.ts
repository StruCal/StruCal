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

        this.maxStress = currentResult.MaxStress;
        this.minStress = currentResult.MinStress;
    }

    public getDisplacement(position: any, meshId: string): number {
        const vertexResult = this.getVertex(position, meshId);
        const displacement = vertexResult.Displacement;
        return displacement * 100;
    }

    public getStress(position: number, meshId: string): string {
        const vertexResult = this.getVertex(position, meshId);
        return vertexResult.Color;
    }

    private getVertex(position: any, meshId: string): VertexResult {
        const vertexResults = this.meshResults.get(meshId);
        const vertexResult = vertexResults.find(e => isEqualPoint(e.Position, position));
        return vertexResult;
    }
}
