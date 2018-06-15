
const maxSteps = 4;

export class ProgressProvider {

    getProgress(step: number): number {
        return Math.round((step / maxSteps * 100));
    }

    getMessage(step: number): string {
        return progressMessageMap.get(step);
    }
}

const progressMessageMap = new Map<number, string>();
progressMessageMap.set(0, 'Gathering data...');
progressMessageMap.set(1, 'Sending data to server...');
progressMessageMap.set(2, 'Performing calculations...');
progressMessageMap.set(3, 'Preparing results...');
progressMessageMap.set(4, 'Fetching results...');


