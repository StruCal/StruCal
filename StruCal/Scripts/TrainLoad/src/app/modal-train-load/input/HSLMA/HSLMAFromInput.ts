import { ModelInput } from '../../../input/modelInput';
import { MovingLoad } from '../../../../common/movingLoad/movingLoad';
import { HSLMABuilder } from '../../../../common/trainLoadBuilders/HSLMABuilder';



export function HSLMAFromInput(input: Array<ModelInput>): MovingLoad {
    const result = HSLMABuilder()
    .setSpeed(input[0].value)
    .setNumberOfIntermediateCoaches(input[1].value)
    .setCoachLength(input[2].value)
    .setBogieAxleSpacing(input[3].value)
    .setPointForce(input[4].value)
    .build();
    return result;
}
