import { Structure } from '../structure/structure';
import { Point } from '../common/point';
import { Perimeter } from '../structure/perimeter';



export const mockedStructure: Structure = {
    Section: {
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
    },
    Spans: [20, 20],
    Additionals: [
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
    ]
}


