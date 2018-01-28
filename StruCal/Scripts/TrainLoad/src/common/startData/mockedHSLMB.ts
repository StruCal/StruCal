import {HSLMBBuilder} from '../trainLoadBuilders/HSLMBBuilder';

export const startHSLMBData = {
    speed: 30,
    numberOfForces: 10,
    distanceBetweenForces: 10
};

export const startHSLMB = HSLMBBuilder()
.setSpeed(startHSLMBData.speed)
.setNumberOfForces(startHSLMBData.numberOfForces)
.setDistanceBetweenForces(startHSLMBData.distanceBetweenForces)
.build();

