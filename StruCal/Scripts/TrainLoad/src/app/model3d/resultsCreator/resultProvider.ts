import { ResultData } from '../../resultData/resultData';
import { isEqual } from '../../common/equal';
import * as THREE from 'three';
import { MeshColorResult } from '../../resultData/meshColorResult';
import { VertexResult } from '../../resultData/vertexResult';
import { Point3D } from '../../common/point3d';



const linear = require('everpolate').linear;

function arePointsEqual(value1: Point3D, value2: any): boolean {
    const result = isEqual(value1.x, value2.x) && isEqual(value1.y, value2.y) && isEqual(value1.z, value2.z);
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
        const currentResult = this.resultData.timeResults
            .find(e => isEqual(e.time, time));
        this.meshResults = new Map<string, VertexResult[]>();
        currentResult.meshResults.forEach(value => {
            this.meshResults.set(value.meshId, value.vertexResults);
        });

        this.maxStress = currentResult.maxStress;
        this.minStress = currentResult.minStress;
    }

    public getDisplacement(position: any, meshId: string): number {
        const vertexResult = this.getVertex(position, meshId);
        const displacement = vertexResult.displacement;
        return displacement * 100;
    }

    public getStress(position: number, meshId: string): string {
        const vertexResult = this.getVertex(position, meshId);
        return vertexResult.color;
    }

    private getVertex(position: any, meshId: string): VertexResult {
        const vertexResults = this.meshResults.get(meshId);
        const vertexResult = vertexResults.find(e => arePointsEqual(e.position, position));
        return vertexResult;
    }
}
