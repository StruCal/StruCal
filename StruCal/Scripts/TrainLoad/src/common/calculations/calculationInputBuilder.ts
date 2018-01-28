import { StructureGeometry } from '../structure/structureGeometry';
import { CalculationsInput } from './calculationsInput';
import { MeshInput } from './meshInput';
import { MovingLoad } from '../movingLoad/movingLoad';
import { TimeSettings } from '../time/timeSettings';
import { maxColor, minColor, middleColor } from '../../3DDrawing/model3d/structureCreator/colors';
import { StructureData } from '../../3DDrawing/model3d/structureCreator/structureData';


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
        return { setTimeSettings };
    }
    function setTimeSettings() {
        const timeSettings = new TimeSettings();
        const structureLength = calculationsInput.structureGeometry.getLength();
        const loadLength = calculationsInput.movingLoads.getLength();

        const endTime = (structureLength + loadLength) / calculationsInput.movingLoads.speed;
        timeSettings.endTime = endTime;
        calculationsInput.timeSettings = timeSettings;
        return { build };
    }
    function build(): CalculationsInput {


        return calculationsInput;
    }

    return { setStructureGeometry };
}

