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
        this.drawingCentre = { x: 50, y: 5 };
        this.drawingHeight = 10;
        this.drawingWidth = 100;

        this.drawRectangle({ x: 0, y: 0 }, { x: 100, y: 10 });
        this.drawPolygon(this.getArrow({ x: 50, y: 0 }));
    }


    private getArrow(insertPoint: Point): Array<Point> {
        const headWidth = 1;
        const headtHeight = 2;
        const tailHeight = 2;
        const arrow = [
            { x: 0, y: 0 },
            { x: headWidth / 2, y: headtHeight },
            { x: 0, y: headtHeight },
            { x: 0, y: headtHeight + tailHeight },
            { x: 0, y: headtHeight },
            { x: -headWidth / 2, y: headtHeight },
        ];

        const transformedToInsertion = arrow.map(e => {
            return {
                x: e.x + insertPoint.x, y: e.y + insertPoint.y
            };
        });
        return transformedToInsertion;
    }
}
