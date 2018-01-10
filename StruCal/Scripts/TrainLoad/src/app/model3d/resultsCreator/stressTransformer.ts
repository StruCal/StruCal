import { ResultInterpolation } from './resultInterpolation';
import * as THREE from 'three';
import { ColorProvider } from './colorProvider';
import { StructureData } from '../structureCreator/structureData';

export class StressTransformer {
    private structureData: StructureData;
    private scene: any;
    private resultInterpolation: ResultInterpolation;
    private colorProvider: ColorProvider;

    constructor(scene: any, resultInterpolation: ResultInterpolation, structureData: StructureData) {
        this.scene = scene;
        this.resultInterpolation = resultInterpolation;
        this.structureData = structureData;
        this.colorProvider = new ColorProvider(381609, -715532);
    }

    public ApplyStress(): void {
        this.colorProvider = new ColorProvider(this.resultInterpolation.maxStress, this.resultInterpolation.minStress);
        const meshes = this.scene.children.filter(e => e.type === 'Mesh');
        meshes.forEach(mesh => {
            const faces = mesh.geometry.faces;
            mesh.geometry.colorsNeedUpdate = true;

            const baseGeometry = this.structureData.GetGeometry(mesh.uuid);
            const baseVertices = baseGeometry.vertices;

            faces.forEach((face, index) => {
                const vertex0 = baseVertices[face.a];
                const vertex1 = baseVertices[face.b];
                const vertex2 = baseVertices[face.c];

                const faceVertices = [vertex0, vertex1, vertex2];

                for (let i = 0; i < 3; i++) {
                    const vertex = faceVertices[i];
                    const stress = this.resultInterpolation.getStress(vertex.z, vertex.y);
                    const color = this.colorProvider.getColor(stress);
                    face.vertexColors[i].set(color);

                }
            });

        });

    }

}
