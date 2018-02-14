import { TrainLoadType } from '../../../common/types/trainLoadType';
import { isProduction } from '../../../../buildScripts/buildType';

export const trainLoadTitleFactory = {};
trainLoadTitleFactory[TrainLoadType.HSLMA] = 'Train Load - HSLM-A';
trainLoadTitleFactory[TrainLoadType.HSLMB] = 'Train Load - HSLM-B';

export const trainLoadImagePathFactory = {};
trainLoadImagePathFactory[TrainLoadType.HSLMA] = isProduction
    ? '/Scripts/TrainLoad/dist/assets/HSLM-A.svg'
    : './assets/HSLM-A.svg';
trainLoadImagePathFactory[TrainLoadType.HSLMB] = isProduction
    ? '/Scripts/TrainLoad/dist/assets/HSLM-B.svg'
    : './assets/HSLM-B.svg';

