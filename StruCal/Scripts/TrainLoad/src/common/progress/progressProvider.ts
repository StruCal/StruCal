
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
progressMessageMap.set(0, 'Message 0');
progressMessageMap.set(1, 'Message 1');
progressMessageMap.set(2, 'Message 2');
progressMessageMap.set(3, 'Message 3');
progressMessageMap.set(4, 'Message 4');


