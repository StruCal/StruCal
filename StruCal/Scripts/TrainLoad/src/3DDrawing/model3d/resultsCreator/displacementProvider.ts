import * as THREE from 'three';
import { ResultProvider } from './resultProvider';
import { StructureData } from '../structureCreator/structureData';

const scaleFactor = 2;

export class DisplacementProvider {
    private structureData: StructureData;
    private scene: any;
    private resultProvider: ResultProvider;
    private displacementScale: number;
    private meshes: Array<any>;

    constructor(scene: any, resultProvider: ResultProvider, structureData: StructureData) {
        this.scene = scene;
        this.resultProvider = resultProvider;
        this.structureData = structureData;

        this.calculateDisplacementScale();
        this.meshes = this.scene.children.filter(e => e.type === 'Mesh' && structureData.isStructureMesh(e.uuid));
    }

    public applyDisplacement(): void {

        this.meshes.forEach(mesh => {
            mesh.geometry.verticesNeedUpdate = true;
            const baseGeometry = this.structureData.getGeometryByMeshId(mesh.uuid);
            const vertices = mesh.geometry.vertices;
            const baseVertices = baseGeometry.vertices;


            vertices.forEach((vertex, index) => {
                const position = baseVertices[index];
                const displacement = this.resultProvider.getDisplacement(position, mesh.uuid);
                vertex.y = baseVertices[index].y + displacement * this.displacementScale;
            });

        });

    }

    private calculateDisplacementScale() {
        const maxDisplacement = this.resultProvider.getMaxDisplacement();
        this.displacementScale = scaleFactor / maxDisplacement;
    }
}
