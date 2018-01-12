import * as THREE from 'three';
import { Point3D } from '../../common/point3d';



export class StructureData {

    private meshIdBarIdMap: Map<string, string>;
    private meshIdGeometryMap: Map<string, any>;

    constructor() {
        this.meshIdGeometryMap = new Map<string, string>();
        this.meshIdBarIdMap = new Map<string, any>();

    }

    public add(geometry: any, meshId: string, barId: string) {


        this.meshIdGeometryMap.set(meshId, geometry.clone());
        this.meshIdBarIdMap.set(meshId, barId);
    }
    public getGeometryByMeshId(meshId: string): any {

        const geometry = this.meshIdGeometryMap.get(meshId);
        return geometry;
    }

    public getVerticesByBarId(barId: string): Array<Point3D> {
        let meshId: string;
        this.meshIdBarIdMap.forEach((value, key, map) => {
            if (value === barId) {
                meshId = key;
            }
        });

        const geometry = this.getGeometryByMeshId(meshId);
        const vertices = geometry.vertices.map(vector => {
            return {
                X: Number(vector.x),
                Y: Number(vector.y),
                Z: Number(vector.z)
            };
        });

        return vertices;
    }

    public getBarIds(): Array<string> {
        const result = Array.from(this.meshIdBarIdMap.values());
        return result;
    }

}
