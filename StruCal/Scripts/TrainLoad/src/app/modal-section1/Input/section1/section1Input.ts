import { startSection1Data } from '../../../../common/startData/mockedSection1';

const multiplier = 1000;

export const section1Input = [{
  name: 'Height:',
  value: startSection1Data.height * multiplier,
  step: 1,
},
{
  name: 'Web thickness:',
  value: startSection1Data.webThickness * multiplier,
  step: 1,
},
{
  name: 'Top flange width:',
  value: startSection1Data.topFlangeWidth * multiplier,
  step: 1,
},
{
  name: 'Top flange thickness:',
  value: startSection1Data.topFlangeThickness * multiplier,
  step: 1,
},
{
  name: 'Bottom flange width:',
  value: startSection1Data.bottomFlangeWidth * multiplier,
  step: 1,
},
{
  name: 'Bottom flange thickness:',
  value: startSection1Data.bottomFlangeThicknes * multiplier,
  step: 1,
}
];
