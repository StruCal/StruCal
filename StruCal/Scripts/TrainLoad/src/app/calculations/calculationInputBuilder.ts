import { StructureGeometry } from '../structure/structureGeometry';
import { StructureData } from '../model3d/structureCreator/structureData';
import { CalculationsInput } from './calculationsInput';
import { MeshInput } from './meshInput';
import { minColor, maxColor, middleColor } from '../model3d/structureCreator/colors';
import { MovingLoad } from '../movingLoad/movingLoad';


export function calculationsInputBuilder() {

    const calculationsInput = new CalculationsInput();
    calculationsInput.maxColor = maxColor;
    calculationsInput.minColor = minColor;
    calculationsInput.middleColor = middleColor;

    function setStructureGeometry(structureGeometry: StructureGeometry) {
        calculationsInput.structureGeometry = structureGeometry;
        return { setStructureData };
    }

    function setStructureData(structureData: StructureData) {
        const meshIds = structureData.getMeshIds();

        const vertices = meshIds.map(meshId => {
            const barVertices = structureData.getVerticesByMeshId(meshId);
            const barId = structureData.getBarIdFromMeshId(meshId);
            const vertexInput: MeshInput = {
                barId: barId,
                meshId: meshId,
                vertices: barVertices,
            };
            return vertexInput;
        });
        calculationsInput.vertices = vertices;
        return { setMovingLoad };
    }
    function setMovingLoad(movingLoad: MovingLoad) {
        calculationsInput.movingLoads = movingLoad;
        return { build };
    }
    function build(): CalculationsInput {
        return calculationsInput;
    }

    return { setStructureGeometry };
}

