import { section1Builder } from '../sectionBuilders/section1Builder';

export const startSectionData = {
    height: 2,
    webThickness: 0.03,
    topFlangeWidth: 0.5,
    topFlangeThickness: 0.01,
    bottomFlangeWidth: 0.7,
    bottomFlangeThicknes: 0.02
}

export const startSection = section1Builder()
    .setHeight(startSectionData.height)
    .setWebThickness(startSectionData.webThickness)
    .setTopFlangeWidth(startSectionData.topFlangeWidth)
    .setTopFlangeThickness(startSectionData.topFlangeThickness)
    .setBottomFlangeWidth(startSectionData.bottomFlangeWidth)
    .setBottomFlangeThickness(startSectionData.bottomFlangeThicknes)
    .build();
