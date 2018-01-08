import { Structure } from '../structure/structure';
import * as THREE from 'three';
import { material } from './material';
import { ResultInterpolation } from '../resultData/resultInterpolation';

const getExtrudeSettings = length => {
    return {
        steps: 20,
        amount: 20,
        bevelEnabled: false,
    };
};

export class StructureCreator {

    private scene: any;
    private structure: Structure;
    constructor(scene: any) {
        this.scene = scene;
    }

    public Draw(structure: Structure) {
        if (structure === undefined || this.scene === undefined) {
            return;
        }
        this.structure = structure;

        this.drawBars();
        this.drawAdditionals();
    }

    private drawBars() {

        this.structure.Bars.forEach(bar => {
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
        });
    }

    private drawAdditionals() {

    }
}
