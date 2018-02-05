import { ModelInput } from '../../../input/modelInput';
import { MovingLoad } from '../../../../common/movingLoad/movingLoad';
import { HSLMBBuilder } from '../../../../common/trainLoadBuilders/HSLMBBuilder';
import { speed } from '../../../../common/startData/speed';



export function HSLMBFromInput(input: Array<ModelInput>): MovingLoad {
    const result = HSLMBBuilder()
    .setSpeed(speed)
    .setNumberOfForces(input[0].value)
    .setDistanceBetweenForces(input[1].value)
    .build();
    return result;
}
