import { ResultProvider } from './resultProvider';
import * as THREE from 'three';
import { ColorProvider } from './colorProvider';
import { StructureData } from '../structureCreator/structureData';

export class StressProvider {
    private structureData: StructureData;
    private scene: any;
    private resultInterpolation: ResultProvider;
    private meshes: Array<any>;

    constructor(scene: any, resultInterpolation: ResultProvider, structureData: StructureData) {
        this.scene = scene;
        this.resultInterpolation = resultInterpolation;
        this.structureData = structureData;
        this.meshes = this.scene.children.filter(e => e.type === 'Mesh');
    }

    public applyStress(): void {
        this.meshes.forEach(mesh => {
            const faces = mesh.geometry.faces;
            mesh.geometry.colorsNeedUpdate = true;

            const baseGeometry = this.structureData.getGeometryByMeshId(mesh.uuid);
            const baseVertices = baseGeometry.vertices;

            faces.forEach((face, index) => {
                const vertex0 = baseVertices[face.a];
                const vertex1 = baseVertices[face.b];
                const vertex2 = baseVertices[face.c];

                const faceVertices = [vertex0, vertex1, vertex2];

                for (let i = 0; i < 3; i++) {
                    const vertex = faceVertices[i];
                    const color = this.resultInterpolation.getStress(vertex, mesh.uuid);
                    face.vertexColors[i].set(color);

                }
            });

        });

    }

}
