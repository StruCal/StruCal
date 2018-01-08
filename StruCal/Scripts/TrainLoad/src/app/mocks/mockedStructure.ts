import { Structure } from '../structure/structure';
import { Point } from '../common/point';
import { Perimeter } from '../structure/perimeter';
import { Section } from '../structure/section';
import { Additional } from '../structure/additional';
import { Bar } from '../structure/bar';

const Guid = require('guid');

const section: Section = {
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
        {
            Coordinates: [
                // web
                {
                    X: -0.05, Y: 0.1,
                },
                {
                    X: -0.05, Y: 0.9,
                },
                {
                    X: 0.05, Y: 0.9,
                },
                {
                    X: 0.05, Y: 0.1,
                },
            ]
        },
        {
            Coordinates: [
                // top flange
                {
                    X: -0.5, Y: 0.9,
                },
                {
                    X: -0.5, Y: 1,
                },
                {
                    X: 0.5, Y: 1,
                },
                {
                    X: 0.5, Y: 0.9,
                },
            ]
        },
    ],
};

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
bar1.Id = Guid.raw();
bar1.StartPoint = { X: 0, Y: 0, Z: 0 };
bar1.EndPoint = { X: 0, Y: 0, Z: 10 };
bar1.Section = section;
bar1.Additionals = additionals;

const bar2 = new Bar();
bar2.Id = Guid.raw();
bar2.StartPoint = { X: 0, Y: 0, Z: 10 };
bar2.EndPoint = { X: 0, Y: 0, Z: 20 };
bar2.Section = section;
bar2.Additionals = additionals;

const bar3 = new Bar();
bar3.Id = Guid.raw();
bar3.StartPoint = { X: 0, Y: 0, Z: 20 };
bar3.EndPoint = { X: 0, Y: 0, Z: 30 };
bar3.Section = section;
bar3.Additionals = additionals;

const bar4 = new Bar();
bar4.Id = Guid.raw();
bar4.StartPoint = { X: 0, Y: 0, Z: 30 };
bar4.EndPoint = { X: 0, Y: 0, Z: 40 };
bar4.Section = section;
bar4.Additionals = additionals;


export const mockedStructure: Structure = {
    Bars: [bar1, bar2, bar3, bar4],
};



