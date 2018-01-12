import { StructureGeometry } from '../structure/structureGeometry';
import { Point } from '../common/point';
import { Perimeter } from '../structure/perimeter';
import { Section } from '../structure/section';
import { Additional } from '../structure/additional';
import { Bar } from '../structure/bar';
import { VerticalSupportCreator } from '../structure/support';

const Guid = require('guid');
const section = new Section();
const sectionProperties = {
    Perimeters: [
        {
            Coordinates: [
                // bottom flange
                {
                    X: -0.5, Y: 0,
                },
                {
                    X: -0.5, Y: 0.1,
                },
                {
                    X: 0.5, Y: 0.1,
                },
                {
                    X: 0.5, Y: 0,
                },
            ]
        },
        // web
        {
            Coordinates: [

                {
                    X: -0.05, Y: 0.1,
                },
                {
                    X: -0.05, Y: 1,
                },
                {
                    X: 0.05, Y: 1,
                },
                {
                    X: 0.05, Y: 0.1,
                },
            ]
        },
        {
            Coordinates: [

                {
                    X: -0.05, Y: 1,
                },
                {
                    X: -0.05, Y: 2,
                },
                {
                    X: 0.05, Y: 2,
                },
                {
                    X: 0.05, Y: 1,
                },
            ]
        },
        {
            Coordinates: [

                {
                    X: -0.05, Y: 2,
                },
                {
                    X: -0.05, Y: 3.9,
                },
                {
                    X: 0.05, Y: 3.9,
                },
                {
                    X: 0.05, Y: 2,
                },
            ]
        },
        {
            Coordinates: [
                // top flange
                {
                    X: -0.5, Y: 3.9,
                },
                {
                    X: -0.5, Y: 4,
                },
                {
                    X: 0.5, Y: 4,
                },
                {
                    X: 0.5, Y: 3.9,
                },
            ]
        },

        // Section 2
        {
            Coordinates: [
                // bottom flange
                {
                    X: 2, Y: 0,
                },
                {
                    X: 2, Y: 0.1,
                },
                {
                    X: 3, Y: 0.1,
                },
                {
                    X: 3, Y: 0,
                },
            ]
        },
        // web
        {
            Coordinates: [

                {
                    X: 2.45, Y: 0.1,
                },
                {
                    X: 2.45, Y: 1,
                },
                {
                    X: 2.55, Y: 1,
                },
                {
                    X: 2.55, Y: 0.1,
                },
            ]
        },
        {
            Coordinates: [

                {
                    X: 2.45, Y: 1,
                },
                {
                    X: 2.45, Y: 2,
                },
                {
                    X: 2.55, Y: 2,
                },
                {
                    X: 2.55, Y: 1,
                },
            ]
        },
        {
            Coordinates: [

                {
                    X: 2.45, Y: 2,
                },
                {
                    X: 2.45, Y: 3.9,
                },
                {
                    X: 2.55, Y: 3.9,
                },
                {
                    X: 2.55, Y: 2,
                },
            ]
        },
        {
            Coordinates: [
                // top flange
                {
                    X: 2, Y: 3.9,
                },
                {
                    X: 2, Y: 4,
                },
                {
                    X: 3, Y: 4,
                },
                {
                    X: 3, Y: 3.9,
                },
            ]
        },
    ],
};
Object.assign(section, sectionProperties);

const additionals: Array<Additional> = [
    {
        Perimeter: {
            Coordinates: [
                { X: 0, Y: 1 },
                { X: 0, Y: 1 },
                { X: 0, Y: 1 },
                { X: 0, Y: 1 },
            ]
        },
        Depth: 0.02,
    }
];

const bar1 = new Bar();
//bar1.Id = Guid.raw();
bar1.StartPoint = { X: 0, Y: 0, Z: 0 };
bar1.EndPoint = { X: 0, Y: 0, Z: 10 };
bar1.Section = section;
bar1.Additionals = additionals;

const bar2 = new Bar();
//bar2.Id = Guid.raw();
bar2.StartPoint = { X: 0, Y: 0, Z: 10 };
bar2.EndPoint = { X: 0, Y: 0, Z: 20 };
bar2.Section = section;
bar2.Additionals = additionals;

const bar3 = new Bar();
//bar3.Id = Guid.raw();
bar3.StartPoint = { X: 0, Y: 0, Z: 20 };
bar3.EndPoint = { X: 0, Y: 0, Z: 30 };
bar3.Section = section;
bar3.Additionals = additionals;

const bar4 = new Bar();
//bar4.Id = Guid.raw();
bar4.StartPoint = { X: 0, Y: 0, Z: 30 };
bar4.EndPoint = { X: 0, Y: 0, Z: 40 };
bar4.Section = section;
bar4.Additionals = additionals;

const support = VerticalSupportCreator({ X: 0, Y: 0, Z: 0 });

export const mockedStructureGeometry: StructureGeometry = {
    Bars: [bar1, bar2, bar3, bar4],
    Supports: [support]
};



