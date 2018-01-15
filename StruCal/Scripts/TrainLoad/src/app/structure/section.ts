import { Perimeter } from './perimeter';


export class Section {
    public perimeters: Array<Perimeter>;

    public getHeight() {
        const ys = this.perimeters.map(e => e.coordinates).reduce((a, b) => a.concat(b)).map(e => e.y);
        const max = Math.max(...ys);
        const min = Math.min(...ys);
        const height = max - min;
        return height;
    }
}
