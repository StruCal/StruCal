import { drawBackgroundPattern } from './backgroundPattern';



export interface DrawingSettings {
    widthHeightRatio: number;
    scaleFactor: number;
    backgroundDrawingFunction: any;
}

export const SectionDrawingSettings: DrawingSettings = {
    widthHeightRatio: 1,
    scaleFactor: 1.5,
    backgroundDrawingFunction: drawBackgroundPattern
};
