import { ResultInterpolation } from './resultInterpolation';
import * as THREE from 'three';
import { ColorProvider } from './colorProvider';

export class StressTransformer {
    scene: any;
    private resultInterpolation: ResultInterpolation;
    private colorProvider: ColorProvider;

    constructor(scene: any, resultInterpolation: ResultInterpolation) {
        this.scene = scene;
        this.resultInterpolation = resultInterpolation;
        this.colorProvider = new ColorProvider(381609, -715532);
    }

    public ApplyStress(): void {
        const meshes = this.scene.children.filter(e => e.type === 'Mesh');
        meshes.forEach(mesh => {
            const faces = mesh.geometry.faces;
            const vertices = mesh.geometry.vertices;
            mesh.geometry.colorsNeedUpdate = true;
            faces.forEach(face => {
                const vertex0 = vertices[face.a];
                const vertex1 = vertices[face.b];
                const vertex2 = vertices[face.c];

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
