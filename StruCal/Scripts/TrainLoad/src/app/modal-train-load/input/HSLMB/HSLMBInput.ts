import { startHSLMBData } from '../../../../common/startData/mockedHSLMB';


export const HSLMBInput = [
  {
    name: 'Number of wheels N:',
    value: startHSLMBData.numberOfForces,
    step: 1,
  },
  {
    name: 'Distance d:',
    value: startHSLMBData.distanceBetweenForces,
    step: 1,
  },
  ];
