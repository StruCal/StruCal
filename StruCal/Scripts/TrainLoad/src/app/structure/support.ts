import { Point3D } from '../common/point3d';




export interface Support {
    Location: Point3D;
    Direction: string;
}

export function VerticalSupportCreator(location: Point3D): Support {
    return {
        Location: location,
        Direction: 'UX',
    };
}

export function HorizontalSupportCreator(location: Point3D): Support {
    return {
        Location: location,
        Direction: 'UY',
    };
}

export function OrtogonalSupportCreator(location: Point3D): Support {
    return {
        Location: location,
        Direction: 'UX|UY',
    };
}

