import { TrainLoadType } from '../../../common/trainLoadBuilders/trainLoadType';
import { ModelInput } from '../../input/modelInput';
import { HSLMAFromInput } from './HSLMA/HSLMAFromInput';
import { HSLMAInput } from './HSLMA/HSLMAInput';



export function trainLoadInputFactory() {

    return { getInput, getTrainLoadBuilder };

    function getInput(type: TrainLoadType|string): Array<ModelInput> {
        switch (type) {
            case TrainLoadType.HSLMA: {
                return HSLMAInput;
            }
        }
    }

    function getTrainLoadBuilder(type: TrainLoadType) {
        switch (type) {
            case TrainLoadType.HSLMA: {
                return {HSLMAFromInput};
            }
        }
    }
}