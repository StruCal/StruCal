import { TrainLoadType } from '../../../common/trainLoadBuilders/trainLoadType';


export const trainLoadTitleFactory = {};
trainLoadTitleFactory[TrainLoadType.HSLMA] = 'Train Load - HSLM-A';
trainLoadTitleFactory[TrainLoadType.HSLMB] = 'Train Load - HSLM-B';

export const trainLoadImagePathFactory = {};
trainLoadImagePathFactory[TrainLoadType.HSLMA] = 'assets/HSLM-A.svg';
trainLoadImagePathFactory[TrainLoadType.HSLMB] = 'assets/HSLM-B.svg';
