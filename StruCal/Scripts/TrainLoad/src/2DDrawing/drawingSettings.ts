import { drawBackgroundPattern } from './backgroundPattern';



export interface DrawingSettings {
    widthHeightRatio: number;
    scaleFactor: number;

    polygonFillColor: string;
    polygonFillOpacity: number;
    polygonStrokeColor: string;
    polygonStrokeWidth: number;

    lineStrokeWidth: number;
    lineColor: string;

    backgroundDrawingFunction: any;
}

export const SectionDrawingSettings: DrawingSettings = {
    widthHeightRatio: 1,
    scaleFactor: 1.5,

    polygonFillColor: '#3276b1',
    polygonFillOpacity: 0.9,
    polygonStrokeColor: '#054072',
    polygonStrokeWidth: 3,

    lineColor: '#f06',
    lineStrokeWidth: 1,

    backgroundDrawingFunction: drawBackgroundPattern
};

export const TrainLoadDrawingSettings: DrawingSettings = {
    widthHeightRatio: 10,
    scaleFactor: 1,

    polygonFillColor: '#3276b1',
    polygonFillOpacity: 0.9,
    polygonStrokeColor: '#054072',
    polygonStrokeWidth: 3,

    lineColor: '#f06',
    lineStrokeWidth: 1,

    backgroundDrawingFunction: () => { }
};
