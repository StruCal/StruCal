import { Point3D } from './point3d';


const almostEqual = require('almost-equal');

export function isEqual(value1: number, value2: number): boolean {
    const result = almostEqual(value1, value2, almostEqual.DBL_EPSILON, almostEqual.DBL_EPSILON);
    return result;
}

