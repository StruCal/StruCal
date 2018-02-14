import { section2Builder } from '../sectionBuilders/section2Builder';

export const startSection2Data = {
    height: 2,
    webThickness: 0.03,
    topFlangeWidth: 0.5,
    topFlangeThickness: 0.01,
    bottomFlangeWidth: 0.7,
    bottomFlangeThicknes: 0.02
};

export const startSection1 = section2Builder()
    .setHeight(startSection2Data.height)
    .setWebThickness(startSection2Data.webThickness)
    .setTopFlangeWidth(startSection2Data.topFlangeWidth)
    .setTopFlangeThickness(startSection2Data.topFlangeThickness)
    .setBottomFlangeWidth(startSection2Data.bottomFlangeWidth)
    .setBottomFlangeThickness(startSection2Data.bottomFlangeThicknes)
    .build();
