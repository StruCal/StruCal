import { StructureGeometry } from '../structure/structureGeometry';
import { StructureData } from '../model3d/structureCreator/structureData';
import { CalculationsInput } from './calculationsInput';
import { VertexInput } from './vertexInput';



export function calculationsInputBuilder(structureGeometry: StructureGeometry, structureData: StructureData)
    : CalculationsInput {

    const meshIds = structureData.getMeshIds();

    const vertices = meshIds.map(meshId => {
        const barVertices = structureData.getVerticesByMeshId(meshId);
        const barId = structureData.getBarIdFromMeshId(meshId);
        const vertexInput: VertexInput = {
            BarId: barId,
            MeshId: meshId,
            Vertices: barVertices,
        };
        return vertexInput;
    });

    return {
        StructureGeometry: structureGeometry,
        Vertices: vertices,
    };

}
