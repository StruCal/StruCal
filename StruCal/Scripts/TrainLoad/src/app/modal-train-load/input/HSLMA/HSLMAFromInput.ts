import { ModelInput } from '../../../input/modelInput';
import { MovingLoad } from '../../../../common/movingLoad/movingLoad';
import { HSLMABuilder } from '../../../../common/trainLoadBuilders/HSLMABuilder';
import { speed } from '../../../../common/startData/speed';



export function HSLMAFromInput(input: Array<ModelInput>): MovingLoad {
    const result = HSLMABuilder()
    .setSpeed(speed)
    .setNumberOfIntermediateCoaches(input[0].value)
    .setCoachLength(input[1].value)
    .setBogieAxleSpacing(input[2].value)
    .setPointForce(input[3].value)
    .build();
    return result;
}
