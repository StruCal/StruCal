import { DrawingBase } from './drawingBase';
import { Point } from '../common/utils/point';
import { Section } from '../common/structure/section';



export class SectionDrawing extends DrawingBase {

    protected drawingCentre: Point;
    protected drawingHeight: number;
    protected drawingWidth: number;

    private section: Section;

    constructor(canvasId: string) {
        super(canvasId);
    }

    draw(section: Section): void {
        this.section = section;
        this.drawingCentre = this.section.getCentre();
        this.drawingHeight = this.section.getHeight();
        this.drawingWidth = this.section.getWidth();
        this.reset();

        this.section.perimeters.forEach(e => this.drawPolygon(e.coordinates));
    }
}
