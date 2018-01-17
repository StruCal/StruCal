import { MovingLoad } from '../movingLoad/movingLoad';



export const mockedMovingLoad: MovingLoad = {
    speed: 1,
    forces: [
        {
            basePosition: -1,
            load: -1000,
        },
        {
            basePosition: -5,
            load: -1000,
        },
        {
            basePosition: -10,
            load: -1000,
        },
    ]
};
