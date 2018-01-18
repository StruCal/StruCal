import { Point3D } from './point3d';


const almostEqual = require('almost-equal');

export function isEqual(value1: number, value2: number): boolean {
    const result = almostEqual(value1, value2, almostEqual.DBL_EPSILON, almostEqual.DBL_EPSILON);
    return result;
}

export function arePointsEqual(point1: Point3D, point2: Point3D): boolean {
    const result = isEqual(point1.x, point2.x) && isEqual(point1.y, point2.y) && isEqual(point1.z, point2.z);
    return result;
}

