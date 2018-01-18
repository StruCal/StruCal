import { DrawingBase } from './drawingBase';
import { Point } from '../common/utils/point';



export class SectionDrawing extends DrawingBase {

    scale = 2;
    drawingCentre = { x: 5, y: 5 };

    constructor(canvasId: string) {
        super(canvasId);
    }

    draw(): void {
        this.drawLine({ x: 0, y: 0 }, { x: 20, y: 20 });
    }
}
