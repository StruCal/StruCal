import { Perimeter } from './perimeter';


export class Section {
    public Perimeters: Array<Perimeter>;

    public getHeight() {
        const ys = this.Perimeters.map(e => e.Coordinates).reduce((a, b) => a.concat(b)).map(e => e.Y);
        const max = Math.max(...ys);
        const min = Math.min(...ys);
        const height = max - min;
        return height;
    }
}
