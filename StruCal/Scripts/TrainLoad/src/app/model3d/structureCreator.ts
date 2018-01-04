import { Structure } from "../structure/structure";
import * as THREE from 'three';
import { material } from "./material";

const extrudeSettings = {
    steps: 2,
    amount: 16,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
};

export class StructureCreator {
    scene: any;
    structure: Structure;
    constructor(scene: any) {

        this.scene = scene;
    }

    public Draw(structure: Structure) {
        if (structure === undefined || this.scene === undefined)
            return;
        this.structure = structure;

        this.drawSection();
        this.drawAdditionals();
    }

    private drawSection() {
        const length = this.structure.Spans.reduce((a, e) => a + e, 0);

        this.structure.Section.Perimeters.forEach(perimeter => {
            const coordinates = perimeter.Coordinates;
            const x0 = coordinates[0].X;
            const y0 = coordinates[0].Y;

            const shape = new THREE.Shape();
            shape.moveTo(x0, y0);

            coordinates.slice(1).forEach(point => {
                shape.lineTo(point.X, point.Y);
            });

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
        });
    }

    private drawAdditionals() {

    }
}