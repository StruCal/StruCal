import * as THREE from 'three';
import { BaseCreator } from './baseCreator';
import { Bar } from '../../structure/bar';
import { getExtrudeSettings } from './extrudeSettings';
import { material, color } from '../material';
import { Section } from '../../structure/section';
import { StructureData } from './structureData';

export class BarsCreator extends BaseCreator {
    private structureData: StructureData;
    constructor(scene: any) {
        super(scene);
    }

    public DrawBars(bars: Array<Bar>, structureData: StructureData): void {
        this.structureData = structureData;
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

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            geometry.faces.forEach(face => {
                for (let i = 0; i < 3; i++) {
                    face.vertexColors[i] = new THREE.Color(color);
                }
            });

            geometry.translate(bar.StartPoint.X, bar.StartPoint.Y, bar.StartPoint.Z);

            const mesh = new THREE.Mesh(geometry, material);
            this.structureData.Add(geometry, mesh.uuid);
            this.scene.add(mesh);
        });
    }
}
