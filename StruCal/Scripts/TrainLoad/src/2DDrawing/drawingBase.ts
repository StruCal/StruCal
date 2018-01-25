import { CanvasHelper } from '../common/canvasHelper/canvasHelper';
import { drawBackgroundPattern } from './backgroundPattern';
import { Perimeter } from '../common/structure/perimeter';
import { Point } from '../common/utils/point';

const SVG = require('svg.js');

const widthHeightRatio = 1;
const scaleFactor = 1.5;

export abstract class DrawingBase {

    private canvas: any;
    private canvasHelper: CanvasHelper;

    protected abstract drawingHeight: number;
    protected abstract drawingWidth: number;
    protected abstract drawingCentre: Point;

    constructor(private canvasId: string) {
        const canvasObject = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvasObject, widthHeightRatio);
        this.canvas = SVG(canvasId);
        drawBackgroundPattern(this.canvas);
    }

    protected drawLine(startPoint: Point, endPoint: Point) {
        const start = this.transferToCanvasSystem(startPoint);
        const end = this.transferToCanvasSystem(endPoint);

        const line = this.canvas.line(start.x, start.y, end.x, end.y).stroke({ width: 1, color: '#f06' });
    }
    protected drawPolygon(points: Array<Point>): void {
        const coordinates = points
                            .map(e => this.transferToCanvasSystem(e))
                            .map(e => e.x + ' ' + e.y)
                            .reduce((a, b) => ' ' + a + ' ' + b)
                            .trim();

        const polygon = this.canvas.polygon(coordinates).fill({ color: '#3276b1', opacity: 0.9 }).stroke({ width: 3, color: '#054072' });
    }

    public reset(): void {
        this.clear();
        this.canvasHelper.refresh();
        drawBackgroundPattern(this.canvas);
    }

    public clear(): void {
        this.canvas.clear();
    }

    private transferToCanvasSystem(point: Point): Point {
        const scale = this.calculateScale();
        const x = ((point.x - this.drawingCentre.x) * scale) + this.canvasHelper.width / 2;
        const y = (-(point.y - this.drawingCentre.y) * scale) + this.canvasHelper.height / 2;
        return { x, y };
    }

    private calculateScale(): number {
        const scale1 = this.canvasHelper.height / this.drawingHeight / scaleFactor;
        const scale2 = this.canvasHelper.width / this.drawingWidth / scaleFactor;

        const scale = Math.min(scale1, scale2);
        return scale;
    }



}
