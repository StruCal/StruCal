import * as THREE from 'three';
import { BaseCreator } from './baseCreator';
import { Bar } from '../../structure/bar';
import { getExtrudeSettings } from './extrudeSettings';
import { material, color } from '../material';
import { Section } from '../../structure/section';
import { StructureData } from './structureData';

const Guid = require('guid');

export class BarsCreator extends BaseCreator {
    private structureData: StructureData;
    constructor(scene: any) {
        super(scene);
    }

    public drawBars(bars: Array<Bar>, structureData: StructureData): void {
        this.structureData = structureData;
        bars.forEach(bar => this.drawBar(bar));
    }

    private drawBar(bar: Bar): void {
        const length = bar.getLength();
        const extrudeSettings = getExtrudeSettings(length);

        bar.section.perimeters.forEach(perimeter => {
            const coordinates = perimeter.coordinates;
            const x0 = coordinates[0].x;
            const y0 = coordinates[0].y;

            const shape = new THREE.Shape();
            shape.moveTo(x0, y0);

            coordinates.slice(1).forEach(point => {
                shape.lineTo(point.x, point.y);
            });

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            geometry.faces.forEach(face => {
                for (let i = 0; i < 3; i++) {
                    face.vertexColors[i] = new THREE.Color(color);
                }
            });


            geometry.translate(bar.startPoint.x, bar.startPoint.y, bar.startPoint.z);

            const mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
            const wireframe = new THREE.LineSegments(geometry, mat);

            const mesh = new THREE.Mesh(geometry, material);
            mesh.add(wireframe);
            this.structureData.add(geometry, mesh.uuid, bar.id);
            this.scene.add(mesh);



        });
    }
}
