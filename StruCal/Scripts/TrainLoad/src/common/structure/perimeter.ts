import { Point } from '../utils/point';

export class Perimeter {
    public coordinates: Array<Point>;

    static mirrorVertical(perimeter: Perimeter) {
        const mirroredCoordinates = perimeter.coordinates.map(e => Point.mirrorVertical(e));
        const mirroredPerimeter = new Perimeter();
        mirroredPerimeter.coordinates = mirroredCoordinates;
        return mirroredPerimeter;
    }
}
