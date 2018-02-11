import { startSection2Data } from '../../../../common/startData/mockedSection2';

const multiplier = 1000;

export const section2Input = [{
  name: 'Height:',
  value: startSection2Data.height * multiplier,
  step: 1,
},
{
  name: 'Web thickness:',
  value: startSection2Data.webThickness * multiplier,
  step: 1,
},
{
  name: 'Top flange width:',
  value: startSection2Data.topFlangeWidth * multiplier,
  step: 1,
},
{
  name: 'Top flange thickness:',
  value: startSection2Data.topFlangeThickness * multiplier,
  step: 1,
},
{
  name: 'Bottom flange width:',
  value: startSection2Data.bottomFlangeWidth * multiplier,
  step: 1,
},
{
  name: 'Bottom flange thickness:',
  value: startSection2Data.bottomFlangeThicknes * multiplier,
  step: 1,
}
];
