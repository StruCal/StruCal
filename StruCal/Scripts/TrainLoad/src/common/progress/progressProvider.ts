import { ProgressMessage } from './progressMessage';

const maxSteps = 4;

export function getProgressInfo(step: number): ProgressMessage {

    const progressValue = Math.round((step / maxSteps * 100));
    const message = progressMessageMap.get(step);

    return {
        value: progressValue,
        message: message,
    };
}

export enum progressStep {
    gatheringData = 0,
    sendingData = 1,
    performingCalculations = 2,
    preparingResults = 3,
    fetchingResult = 4
}

const progressMessageMap = new Map<progressStep, string>();
progressMessageMap.set(0, 'Gathering data...');
progressMessageMap.set(1, 'Sending data to server...');
progressMessageMap.set(2, 'Performing calculations...');
progressMessageMap.set(3, 'Preparing results...');
progressMessageMap.set(4, 'Fetching results...');


