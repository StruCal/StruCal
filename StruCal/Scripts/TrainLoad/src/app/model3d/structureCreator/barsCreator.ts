import * as THREE from 'three';
import { BaseCreator } from './baseCreator';
import { Bar } from '../../structure/bar';
import { getExtrudeSettings } from './extrudeSettings';
import { material } from '../material';
import { Section } from '../../structure/section';

export class BarsCreator extends BaseCreator {
    constructor(scene: any) {
        super(scene);
    }

    public DrawBars(bars: Array<Bar>): void {
        bars.forEach(bar => this.drawBar(bar));
    }

    private drawBar(bar: Bar): void {
        const length = bar.getLength();
        const extrudeSettings = getExtrudeSettings(length);

        bar.Section.Perimeters.forEach(perimeter => {
            const coordinates = perimeter.Coordinates;
            const x0 = coordinates[0].X;
            const y0 = coordinates[0].Y;

            const shape = new THREE.Shape();
            shape.moveTo(x0, y0);

            coordinates.slice(1).forEach(point => {
                shape.lineTo(point.X, point.Y);
            });

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings );
            geometry.translate(bar.StartPoint.X, bar.StartPoint.Y, bar.StartPoint.Z);
            const mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
        });
    }
}
