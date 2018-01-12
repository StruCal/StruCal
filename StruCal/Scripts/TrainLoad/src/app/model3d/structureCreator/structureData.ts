import * as THREE from 'three';



export class StructureData {

    private meshIdBarIdMap: Map<string, string>;
    private meshIdGeometryMap: Map<string, any>;

    constructor() {
        this.meshIdGeometryMap = new Map<string, string>();
        this.meshIdBarIdMap = new Map<string, any>();

    }

    public Add(geometry: any, meshId: string, barId: string) {


        this.meshIdGeometryMap.set(meshId, geometry.clone());
        this.meshIdBarIdMap.set(meshId, barId);
    }
    public GetGeometry(meshId: string): any {

        const geometry = this.meshIdGeometryMap.get(meshId);
        return geometry;
    }
}
