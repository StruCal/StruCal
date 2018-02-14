import { Perimeter } from './perimeter';
import { Point } from '../utils/point';
import { isEqual } from '../utils/equal';


export class Section {
    public perimeters: Array<Perimeter>;

    public getHeight(): number {
        const ys = this.getCoordinates().map(e => e.y);
        const max = Math.max(...ys);
        const min = Math.min(...ys);
        const height = max - min;
        return height;
    }

    public getWidth(): number {
        const xs = this.getCoordinates().map(e => e.x);
        const max = Math.max(...xs);
        const min = Math.min(...xs);
        const width = max - min;
        return width;
    }

    public getCentre(): Point {
        const height = this.getHeight();
        const width = this.getWidth();

        const xs = this.getCoordinates().map(e => e.x);
        const ys = this.getCoordinates().map(e => e.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);

        const x = minX + width / 2;
        const y = minY + height / 2;

        return { x, y };
    }

    public getBottomWidth(): number {
        const coordinates = this.getCoordinates();
        const sortedVertically = coordinates.sort((a, b) => a.y - b.y);
        const minY = coordinates[0].y;
        const bottomXs = sortedVertically.filter(e => isEqual(e.y, minY)).map(e => e.x);
        const maxX = Math.max(...bottomXs);
        const minX = Math.min(...bottomXs);

        const width = maxX - minX;
        return width;
    }

    private getCoordinates(): Array<Point> {
        const coord = this.perimeters.map(e => e.coordinates).reduce((a, b) => a.concat(b));
        return coord;
    }
}
