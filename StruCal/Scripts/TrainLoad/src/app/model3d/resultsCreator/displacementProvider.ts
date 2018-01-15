import * as THREE from 'three';
import { ResultProvider } from './resultProvider';
import { StructureData } from '../structureCreator/structureData';


export class DisplacementProvider {
    private structureData: StructureData;
    private scene: any;
    private resultInterpolation: ResultProvider;
    constructor(scene: any, resultInterpolation: ResultProvider, structureData: StructureData) {
        this.scene = scene;
        this.resultInterpolation = resultInterpolation;
        this.structureData = structureData;
    }

    public applyDisplacement(): void {
        const meshes = this.scene.children.filter(e => e.type === 'Mesh');

        meshes.forEach(mesh => {
            mesh.geometry.verticesNeedUpdate = true;
            const baseGeometry = this.structureData.getGeometryByMeshId(mesh.uuid);
            const vertices = mesh.geometry.vertices;
            const baseVertices = baseGeometry.vertices;


            vertices.forEach((vertex, index) => {
                const position = baseVertices[index];
                const displacement = this.resultInterpolation.getDisplacement(position, mesh.uuid);
                vertex.y = baseVertices[index].y + displacement;
            });

        });

    }

}
