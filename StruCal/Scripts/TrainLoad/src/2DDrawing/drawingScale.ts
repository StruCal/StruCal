import { Perimeter } from '../common/structure/perimeter';
import { CanvasHelper } from '../common/canvasHelper/canvasHelper';



const scaleFactor = 2;
export class DrawingScaleCalculator {

    constructor(private canvasHelper: CanvasHelper) {}

    calculateDrawingScale(perimeters: Array<Perimeter>): number {
        const points = perimeters.map(e => e.coordinates).reduce((a, b) => a.concat(b));
        const xs = points.map(e => e.x);
        const ys = points.map(e => e.y);
        const maxX = Math.max(...xs);
        const minX = Math.min(...xs);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);

        const drawingWidth = maxX - minX;
        const drawingHeight = maxY - minY;

        const scale1 = this.canvasHelper.height / drawingHeight / scaleFactor;
        const scale2 = this.canvasHelper.width / drawingWidth / scaleFactor;

        const scale = Math.min(scale1, scale2);
        return scale;
    }
}
