import { section1Builder } from '../sectionBuilders/section1Builder';


export const mockedSection = section1Builder().setHeight(2).setWebThickness(0.03)
.setTopFlangeWidth(0.5).setTopFlangeThickness(0.01).setBottomFlangeWidth(0.7)
.setBottomFlangeThickness(0.02).build();
