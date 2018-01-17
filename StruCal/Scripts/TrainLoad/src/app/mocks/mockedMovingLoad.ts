import { MovingLoad } from '../movingLoad/movingLoad';



const mockedMovingLoadProperties = {
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

export const mockedMovingLoad = new MovingLoad();
Object.assign(mockedMovingLoad, mockedMovingLoadProperties);
