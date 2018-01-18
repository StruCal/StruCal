

const deltaTime = 1;
export class Time {
    private currentTime: number;

    constructor() { }

    public tick(): void {
        this.currentTime += deltaTime;
    }

    public getCurrentTime(): number {
        return this.currentTime;
    }

}
