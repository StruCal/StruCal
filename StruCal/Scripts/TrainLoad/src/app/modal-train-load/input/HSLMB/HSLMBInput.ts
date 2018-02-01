import { startHSLMBData } from '../../../../common/startData/mockedHSLMB';


export const HSLMBInput = [
  {
    name: 'Number of wheels:',
    value: startHSLMBData.numberOfForces,
    step: 1,
  },
  {
    name: 'Distance between wheels:',
    value: startHSLMBData.distanceBetweenForces,
    step: 1,
  },
  ];
