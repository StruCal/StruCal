import { TimeSettings } from './timeSettings';



const deltaTime = 1;
export class TimeProvider {
    private currentTime = 0;

    constructor(private timeSettings: TimeSettings) { }

    public tick(): void {
        this.currentTime = this.currentTime >= this.timeSettings.endTime ? 0 : this.currentTime + deltaTime;
    }

    public getCurrentTime(): number {
        return this.currentTime;
    }
}
