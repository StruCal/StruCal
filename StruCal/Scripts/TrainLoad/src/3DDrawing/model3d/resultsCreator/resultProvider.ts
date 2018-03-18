import * as THREE from 'three';
import { ResultData } from '../../../common/resultData/resultData';
import { VertexResult } from '../../../common/resultData/vertexResult';
import { isEqual, arePointsEqual } from '../../../common/utils/equal';
import { Point3D } from '../../../common/utils/point3d';


export class ResultProvider {
    private resultData: ResultData;
    private meshResults: Map<string, VertexResult[]>;

    private currentAcceleration: number;

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
        this.currentAcceleration = currentResult.acceleration;
    }

    public getMaxAcceleration(): number {
        return this.currentAcceleration;
    }

    public getDisplacement(point: Point3D, meshId: string): number {
        const vertexResult = this.getVertex(point, meshId);
        const displacement = vertexResult.displacement;
        return displacement;
    }

    public getColor(point: Point3D, meshId: string): string {
        const vertexResult = this.getVertex(point, meshId);
        return vertexResult.color;
    }

    public getMaxDisplacement(): number {
        return this.resultData.maxAbsoluteDisplacement;
    }

    private getVertex(point: Point3D, meshId: string): VertexResult {
        const vertexResults = this.meshResults.get(meshId);
        const vertexResult = vertexResults.find(e => arePointsEqual(e.position, point));
        return vertexResult;
    }

}
