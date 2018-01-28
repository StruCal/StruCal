import { MovingForce } from '../movingLoad/movingForce';
import { MovingLoad } from '../movingLoad/movingLoad';





export function HSLMABuilder() {
    const trainLoad = new MovingLoad();
    let numberOfIntermediateCoaches: number;
    let coachLength: number;
    let bogieAxleSpacing: number;
    let pointForce: number;
    const movingForces = new Array<MovingForce>();
    return { setSpeed };

    function setSpeed(speed: number) {
        trainLoad.speed = speed;
        return { setNumberOfIntermediateCoaches };
    }
    function setNumberOfIntermediateCoaches(n: number) {
        numberOfIntermediateCoaches = n;
        return { setCoachLength };
    }
    function setCoachLength(d: number) {
        coachLength = d;
        return { setBogieAxleSpacing };
    }
    function setBogieAxleSpacing(d: number) {
        bogieAxleSpacing = d;
        return { setPointForce };
    }
    function setPointForce(p: number) {
        pointForce = p;
        return { build };
    }
    function build(): MovingLoad {

        const frontPowerCar = [0, 3, 11, 3, 3.525];
        const frontCoach = [bogieAxleSpacing, coachLength - 1.5 * bogieAxleSpacing - 3.525 / 2];

        const distance = coachLength - bogieAxleSpacing;
        const intermediateCoaches = Array.from(Array(numberOfIntermediateCoaches).keys())
            .map((e) => {
                return [bogieAxleSpacing, coachLength - bogieAxleSpacing];
            })
            .reduce((a, e) => a.concat(e));
        const rearCoach = frontCoach.reverse();
        const rearPowerCar = frontPowerCar.reverse();

        const distances = [...frontPowerCar, ...frontCoach, ...intermediateCoaches, ...rearCoach, ...rearPowerCar];
        const positions = distances.map((e, i) => distances.slice(0, i + 1))
            .map(e => e.reduce((a, g) => a + g));
        positions.forEach(position => {
                movingForces.push({ basePosition: -position, load: -pointForce });
        });

        trainLoad.forces = movingForces;
        return trainLoad;
    }
}
