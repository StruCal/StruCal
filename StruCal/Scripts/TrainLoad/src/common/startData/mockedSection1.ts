import { section1Builder } from '../sectionBuilders/section1Builder';

export const startSection1Data = {
    height: 2,
    webThickness: 0.03,
    topFlangeWidth: 0.5,
    topFlangeThickness: 0.01,
    bottomFlangeWidth: 0.7,
    bottomFlangeThicknes: 0.02
};

export const startSection1 = section1Builder()
    .setHeight(startSection1Data.height)
    .setWebThickness(startSection1Data.webThickness)
    .setTopFlangeWidth(startSection1Data.topFlangeWidth)
    .setTopFlangeThickness(startSection1Data.topFlangeThickness)
    .setBottomFlangeWidth(startSection1Data.bottomFlangeWidth)
    .setBottomFlangeThickness(startSection1Data.bottomFlangeThicknes)
    .build();
