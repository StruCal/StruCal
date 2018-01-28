import { MovingLoad } from '../movingLoad/movingLoad';
import { MovingForce } from '../movingLoad/movingForce';




export function HSLMBBuilder() {
    const trainLoad = new MovingLoad();
    const pointLoad = 170;
    let numberOfForces: number;
    let distanceBetweenForces: number;
    const movingForces = new Array<MovingForce>();
    return { setSpeed };
    function setSpeed(speed: number) {
        trainLoad.speed = speed;
        return { setNumberOfForces };
    }
    function setNumberOfForces(n: number) {
        numberOfForces = n;
        return { setDistanceBetweenForces };
    }
    function setDistanceBetweenForces(d: number) {
        distanceBetweenForces = d;
        return { build };
    }
    function build(): MovingLoad {
        const forces = Array.from(Array(numberOfForces).keys())
            .map(e => distanceBetweenForces * e);
        forces.forEach(position => {
            movingForces.push({ basePosition: position, load: pointLoad });
        });

        trainLoad.forces = movingForces;
        return trainLoad;
    }
}
