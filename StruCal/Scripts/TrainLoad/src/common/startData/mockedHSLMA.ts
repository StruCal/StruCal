import { HSLMABuilder } from '../trainLoadBuilders/HSLMABuilder';
import { speed } from './speed';

export const startHSLMAData = {
    speed: speed,
    numberOfIntermediateCoached: 10,
    coachLength: 10,
    bogieAxleSpacing: 2,
    pointForce: 150,
};

export const startHSLMA = HSLMABuilder()
.setSpeed(startHSLMAData.speed)
.setNumberOfIntermediateCoaches(startHSLMAData.numberOfIntermediateCoached)
.setCoachLength(startHSLMAData.coachLength)
.setBogieAxleSpacing(startHSLMAData.bogieAxleSpacing)
.setPointForce(startHSLMAData.pointForce)
.build();

