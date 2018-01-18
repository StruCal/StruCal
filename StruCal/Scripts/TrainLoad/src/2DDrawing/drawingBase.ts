import { CanvasHelper } from '../common/canvasHelper/canvasHelper';
import { drawBackgroundPattern } from './backgroundPattern';
import { Perimeter } from '../common/structure/perimeter';
import { DrawingScaleCalculator } from './drawingScale';
import { Point } from '../common/utils/point';

const SVG = require('svg.js');

const widthHeightRatio = 1;


export abstract class DrawingBase {

    private canvas: any;
    private canvasHelper: CanvasHelper;

    protected abstract scale: number;
    protected abstract drawingCentre: Point;

    constructor(private canvasId: string) {
        const canvasObject = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvasObject, widthHeightRatio);
        this.canvas = SVG(canvasId);
        drawBackgroundPattern(this.canvas);
    }

    private drawLine(startPoint: Point, endPoint: Point) {
        const start = this.transferToCanvasSystem(startPoint);
        const end = this.transferToCanvasSystem(endPoint);

        const line = this.canvas.line(start.x, start.y, end.x, end.y).stroke({ width: 1, color: '#f06' });
    }

    public reset(): void {
        this.clear();
        drawBackgroundPattern(this.canvas);
    }

    public clear(): void {
        this.canvas.clear();
    }

    private transferToCanvasSystem(point: Point): Point {
        const x = ((point.x - this.drawingCentre.x) * this.scale) + this.canvasHelper.width / 2;
        const y = (-(point.y - this.drawingCentre.y) * this.scale) + this.canvasHelper.height / 2;
        return { x, y };
    }




}
