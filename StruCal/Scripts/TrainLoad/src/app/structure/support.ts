import { Point3D } from '../common/point3d';




export interface Support {
    location: Point3D;
    direction: string;
}

export function VerticalSupportCreator(location: Point3D): Support {
    return {
        location: location,
        direction: 'UX',
    };
}

export function HorizontalSupportCreator(location: Point3D): Support {
    return {
        location: location,
        direction: 'UY',
    };
}

export function OrtogonalSupportCreator(location: Point3D): Support {
    return {
        location: location,
        direction: 'UX|UY',
    };
}

