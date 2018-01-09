import * as THREE from 'three';

class BarData {
    public Geometry: any;
    public Id: string;
}

export class StructureData {

    private barData: Array<BarData>;

    constructor() {
        this.barData = [];
    }

    public Add(geometry: any, id: string) {
        const barData: BarData = {
            Geometry: geometry.clone(),
            Id: id
        };
        this.barData.push(barData);
    }
    public GetGeometry(uuid: string): any {
        const barData = this.barData.find(e => e.Id === uuid);
        return barData.Geometry;
    }
}
