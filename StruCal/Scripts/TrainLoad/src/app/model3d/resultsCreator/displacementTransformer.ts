import { ResultInterpolation } from './resultInterpolation';


export class DisplacementTransformer {
    scene: any;
    private resultInterpolation: ResultInterpolation;
    constructor(scene: any, resultInterpolation: ResultInterpolation) {
        this.scene = scene;
        this.resultInterpolation = resultInterpolation;
    }

    public ApplyDisplacement(): void {
        const meshes = this.scene.children.filter(e => e.type === 'Mesh');

        meshes.forEach(mesh => {
            mesh.geometry.verticesNeedUpdate = true;
            const vertices = mesh.geometry.vertices;
            vertices.forEach(vertex => {
                const position = vertex.z;
                const displacement = this.resultInterpolation.getDisplacement(position);
                vertex.y += displacement;
            });

        });

    }

}
