import { StructureGeometry } from '../structure/structureGeometry';
import { StructureData } from '../model3d/structureCreator/structureData';
import { CalculationsInput } from './calculationsInput';
import { MeshInput } from './meshInput';
import { minColor, maxColor } from '../model3d/structureCreator/colors';



export function calculationsInputBuilder(structureGeometry: StructureGeometry, structureData: StructureData)
    : CalculationsInput {

    const meshIds = structureData.getMeshIds();

    const vertices = meshIds.map(meshId => {
        const barVertices = structureData.getVerticesByMeshId(meshId);
        const barId = structureData.getBarIdFromMeshId(meshId);
        const vertexInput: MeshInput = {
            BarId: barId,
            MeshId: meshId,
            Vertices: barVertices,
        };
        return vertexInput;
    });

    return {
        MaxColor: maxColor,
        MinColor: minColor,
        StructureGeometry: structureGeometry,
        Vertices: vertices,
    };

}
