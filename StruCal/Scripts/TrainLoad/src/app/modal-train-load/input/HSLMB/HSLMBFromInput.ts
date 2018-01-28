import { ModelInput } from '../../../input/modelInput';
import { MovingLoad } from '../../../../common/movingLoad/movingLoad';
import { HSLMBBuilder } from '../../../../common/trainLoadBuilders/HSLMBBuilder';



export function HSLMBFromInput(input: Array<ModelInput>): MovingLoad {
    const result = HSLMBBuilder()
    .setSpeed(input[0].value)
    .setNumberOfForces(input[1].value)
    .setDistanceBetweenForces(input[2].value)
    .build();
    return result;
}
