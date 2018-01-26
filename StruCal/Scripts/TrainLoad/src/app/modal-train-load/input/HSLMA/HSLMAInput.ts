import { startHSLMAData } from '../../../../common/startData/mockedHSLMA';


export const HSLMAInput = [{
  name: 'Speed:',
  value: startHSLMAData.speed,
  step: 1,
},
{
  name: 'Number Of Intermediate Coaches:',
  value: startHSLMAData.numberOfIntermediateCoached,
  step: 1,
},
{
  name: 'Coach Length:',
  value: startHSLMAData.coachLength,
  step: 1,
},
{
  name: 'Bogie Axle Spacing:',
  value: startHSLMAData.bogieAxleSpacing,
  step: 1,
},
{
  name: 'Point Force:',
  value: startHSLMAData.pointForce,
  step: 1,
},

];
