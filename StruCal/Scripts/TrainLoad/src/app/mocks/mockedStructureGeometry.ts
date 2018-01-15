import { StructureGeometry } from '../structure/structureGeometry';
import { Point } from '../common/point';
import { Perimeter } from '../structure/perimeter';
import { Section } from '../structure/section';
import { Additional } from '../structure/additional';
import { Bar } from '../structure/bar';
import { VerticalSupportCreator, OrtogonalSupportCreator } from '../structure/support';

const Guid = require('guid');
const section = new Section();
const sectionProperties = {
    perimeters: [
        {
            coordinates: [
                // bottom flange
                {
                    x: -0.5, y: 0,
                },
                {
                    x: -0.5, y: 0.1,
                },
                {
                    x: 0.5, y: 0.1,
                },
                {
                    x: 0.5, y: 0,
                },
            ]
        },
        // web
        {
            coordinates: [

                {
                    x: -0.05, y: 0.1,
                },
                {
                    x: -0.05, y: 1,
                },
                {
                    x: 0.05, y: 1,
                },
                {
                    x: 0.05, y: 0.1,
                },
            ]
        },
        {
            coordinates: [

                {
                    x: -0.05, y: 1,
                },
                {
                    x: -0.05, y: 2,
                },
                {
                    x: 0.05, y: 2,
                },
                {
                    x: 0.05, y: 1,
                },
            ]
        },
        {
            coordinates: [

                {
                    x: -0.05, y: 2,
                },
                {
                    x: -0.05, y: 3.9,
                },
                {
                    x: 0.05, y: 3.9,
                },
                {
                    x: 0.05, y: 2,
                },
            ]
        },
        {
            coordinates: [
                // top flange
                {
                    x: -0.5, y: 3.9,
                },
                {
                    x: -0.5, y: 4,
                },
                {
                    x: 0.5, y: 4,
                },
                {
                    x: 0.5, y: 3.9,
                },
            ]
        },

        // Section 2
        {
            coordinates: [
                // bottom flange
                {
                    x: 2, y: 0,
                },
                {
                    x: 2, y: 0.1,
                },
                {
                    x: 3, y: 0.1,
                },
                {
                    x: 3, y: 0,
                },
            ]
        },
        // web
        {
            coordinates: [

                {
                    x: 2.45, y: 0.1,
                },
                {
                    x: 2.45, y: 1,
                },
                {
                    x: 2.55, y: 1,
                },
                {
                    x: 2.55, y: 0.1,
                },
            ]
        },
        {
            coordinates: [

                {
                    x: 2.45, y: 1,
                },
                {
                    x: 2.45, y: 2,
                },
                {
                    x: 2.55, y: 2,
                },
                {
                    x: 2.55, y: 1,
                },
            ]
        },
        {
            coordinates: [

                {
                    x: 2.45, y: 2,
                },
                {
                    x: 2.45, y: 3.9,
                },
                {
                    x: 2.55, y: 3.9,
                },
                {
                    x: 2.55, y: 2,
                },
            ]
        },
        {
            coordinates: [
                // top flange
                {
                    x: 2, y: 3.9,
                },
                {
                    x: 2, y: 4,
                },
                {
                    x: 3, y: 4,
                },
                {
                    x: 3, y: 3.9,
                },
            ]
        },
    ],
};
Object.assign(section, sectionProperties);

const additionals: Array<Additional> = [
    {
        perimeter: {
            coordinates: [
                { x: 0, y: 1 },
                { x: 0, y: 1 },
                { x: 0, y: 1 },
                { x: 0, y: 1 },
            ]
        },
        depth: 0.02,
    }
];

const bar1 = new Bar();
//bar1.Id = Guid.raw();
bar1.startPoint = { x: 0, y: 0, z: 0 };
bar1.endPoint = { x: 0, y: 0, z: 10 };
bar1.section = section;
bar1.additionals = additionals;

const bar2 = new Bar();
//bar2.Id = Guid.raw();
bar2.startPoint = { x: 0, y: 0, z: 10 };
bar2.endPoint = { x: 0, y: 0, z: 20 };
bar2.section = section;
bar2.additionals = additionals;

const bar3 = new Bar();
//bar3.Id = Guid.raw();
bar3.startPoint = { x: 0, y: 0, z: 20 };
bar3.endPoint = { x: 0, y: 0, z: 30 };
bar3.section = section;
bar3.additionals = additionals;

const bar4 = new Bar();
//bar4.Id = Guid.raw();
bar4.startPoint = { x: 0, y: 0, z: 30 };
bar4.endPoint = { x: 0, y: 0, z: 40 };
bar4.section = section;
bar4.additionals = additionals;

const support1 = OrtogonalSupportCreator({ x: 0, y: 0, z: 0 });
const support2 = OrtogonalSupportCreator({ x: 0, y: 0, z: 40 });
const support3 = OrtogonalSupportCreator({ x: 0, y: 0, z: 20 });

export const mockedStructureGeometry: StructureGeometry = {
    bars: [bar1, bar2, bar3, bar4],
    supports: [support1, support2, support3]
};



