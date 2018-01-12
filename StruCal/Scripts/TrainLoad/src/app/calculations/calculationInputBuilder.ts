import { StructureGeometry } from '../structure/structureGeometry';
import { StructureData } from '../model3d/structureCreator/structureData';
import { CalculationsInput } from './calculationsInput';
import { VertexInput } from './vertexInput';



export function calculationsInputBuilder(structureGeometry: StructureGeometry, structureData: StructureData)
    : CalculationsInput {

    const barIds = structureData.getBarIds();

    const vertices = barIds.map(barId => {
        const barVertices = structureData.getVerticesByBarId(barId);

        const vertexInput: VertexInput = {
            BarId: barId,
            Vertices: barVertices,
        };
        return vertexInput;
    });

    return {
        StructureGeometry: structureGeometry,
        Vertices: vertices,
    };

}
