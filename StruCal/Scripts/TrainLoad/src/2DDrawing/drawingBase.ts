import { CanvasHelper } from '../common/canvasHelper/canvasHelper';
import { Perimeter } from '../common/structure/perimeter';
import { Point } from '../common/utils/point';
import { DrawingSettings } from './drawingSettings';

const SVG = require('svg.js');


export abstract class DrawingBase {
    private settings: DrawingSettings;

    private canvas: any;
    private canvasHelper: CanvasHelper;

    protected abstract drawingHeight: number;
    protected abstract drawingWidth: number;
    protected abstract drawingCentre: Point;


    constructor(private canvasId: string, settings: DrawingSettings) {
        this.settings = settings;
        const canvasObject = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvasObject, settings.widthHeightRatio);
        this.canvas = SVG(canvasId);
        this.settings.backgroundDrawingFunction(this.canvas);
    }

    protected drawLine(startPoint: Point, endPoint: Point) {
        const start = this.transferToCanvasSystem(startPoint);
        const end = this.transferToCanvasSystem(endPoint);

        const line = this.canvas.line(start.x, start.y, end.x, end.y)
                                .stroke({ width: this.settings.lineStrokeWidth, color: this.settings.lineColor });
    }
    protected drawPolygon(points: Array<Point>): void {
        const coordinates = points
                            .map(e => this.transferToCanvasSystem(e))
                            .map(e => e.x + ' ' + e.y)
                            .reduce((a, b) => ' ' + a + ' ' + b)
                            .trim();

        const polygon = this.canvas.polygon(coordinates)
                                   .fill({ color: this.settings.polygonFillColor, opacity: this.settings.polygonFillOpacity })
                                   .stroke({ width: this.settings.polygonStrokeWidth, color: this.settings.polygonStrokeColor });
    }

    public reset(): void {
        this.clear();
        this.canvasHelper.refresh();
        this.settings.backgroundDrawingFunction(this.canvas);
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
        const scale1 = this.canvasHelper.height / this.drawingHeight / this.settings.scaleFactor;
        const scale2 = this.canvasHelper.width / this.drawingWidth / this.settings.scaleFactor;

        const scale = Math.min(scale1, scale2);
        return scale;
    }



}
