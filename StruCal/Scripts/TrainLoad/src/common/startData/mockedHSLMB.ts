import {HSLMBBuilder} from '../trainLoadBuilders/HSLMBBuilder';
import { speed } from './speed';

export const startHSLMBData = {
    speed: speed,
    numberOfForces: 10,
    distanceBetweenForces: 10
};

export const startHSLMB = HSLMBBuilder()
.setSpeed(startHSLMBData.speed)
.setNumberOfForces(startHSLMBData.numberOfForces)
.setDistanceBetweenForces(startHSLMBData.distanceBetweenForces)
.build();

