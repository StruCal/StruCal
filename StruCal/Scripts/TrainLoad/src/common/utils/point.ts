

export class Point {
    public x: number;
    public y: number;

    static mirrorVertical(point: Point): Point {
        const newPoint = new Point();
        newPoint.x = -point.x;
        newPoint.y = point.y;
        return newPoint;
    }
}
