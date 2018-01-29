import { Point } from '../common/utils/point';
import { DrawingBase } from './drawingBase';
import { TrainLoadDrawingSettings } from './drawingSettings';



export class TrainLoadDrawing extends DrawingBase {

    protected drawingCentre: Point;
    protected drawingHeight: number;
    protected drawingWidth: number;



    constructor(canvasId: string) {
        super(canvasId, TrainLoadDrawingSettings);
    }

    draw(): void {
        this.drawingCentre = { x: 5, y: 5 };
        this.drawingHeight = 10;
        this.drawingWidth = 100;
        this.drawLine({ x: 0, y: 0 }, { x: 10, y: 10 });
    }
}
