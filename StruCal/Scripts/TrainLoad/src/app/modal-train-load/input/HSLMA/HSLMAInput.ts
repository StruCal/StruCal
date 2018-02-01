import { startHSLMAData } from '../../../../common/startData/mockedHSLMA';


export const HSLMAInput = [
  {
    name: 'Intermediate Coaches N:',
    value: startHSLMAData.numberOfIntermediateCoached,
    step: 1,
  },
  {
    name: 'Coach Length D:',
    value: startHSLMAData.coachLength,
    step: 1,
  },
  {
    name: 'Bogie Axle Spacing d:',
    value: startHSLMAData.bogieAxleSpacing,
    step: 1,
  },
  {
    name: 'Point Force:',
    value: startHSLMAData.pointForce,
    step: 1,
  },

];
