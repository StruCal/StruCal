import { ResultData } from '../../resultData/resultData';
import { isEqual, arePointsEqual } from '../../common/equal';
import * as THREE from 'three';
import { MeshColorResult } from '../../resultData/meshColorResult';
import { VertexResult } from '../../resultData/vertexResult';
import { Point3D } from '../../common/point3d';




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

    public getDisplacement(point: Point3D, meshId: string): number {
        const vertexResult = this.getVertex(point, meshId);
        const displacement = vertexResult.displacement;
        return displacement * 100;
    }

    public getStress(point: Point3D, meshId: string): string {
        const vertexResult = this.getVertex(point, meshId);
        return vertexResult.color;
    }

    private getVertex(point: Point3D, meshId: string): VertexResult {
        const vertexResults = this.meshResults.get(meshId);
        const vertexResult = vertexResults.find(e => arePointsEqual(e.position, point));
        return vertexResult;
    }
}
