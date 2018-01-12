import { ResultInterpolation } from './resultInterpolation';
import { StructureData } from '../structureCreator/structureData';


export class DisplacementProvider {
    private structureData: StructureData;
    private scene: any;
    private resultInterpolation: ResultInterpolation;
    constructor(scene: any, resultInterpolation: ResultInterpolation, structureData: StructureData) {
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
                const position = baseVertices[index].z;
                const displacement = this.resultInterpolation.getDisplacement(position);
                vertex.y = baseVertices[index].y + displacement;
            });

        });

    }

}
