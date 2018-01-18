

const deltaTime = 1;
export class TimeProvider {
    private currentTime = 0;

    constructor() { }

    public tick(): void {
        this.currentTime += deltaTime;
    }

    public getCurrentTime(): number {
        return this.currentTime;
    }

    public reset(): void {
        this.currentTime = 0;
    }
}
