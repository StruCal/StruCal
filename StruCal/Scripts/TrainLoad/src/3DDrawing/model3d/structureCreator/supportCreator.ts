import { BaseCreator } from './baseCreator';
import { Bar } from '../../../common/structure/bar';
import { Point3D } from '../../../common/utils/point3d';
import * as THREE from 'three';
import { getExtrudeSettings } from './extrudeSettings';
import { materialSupport } from '../material';
import { Support } from '../../../common/structure/support';

const width = 0.3;
const length = 1;
const headHeight = 0.3;
const bodyHeight = 0.3;

export class SupportCreator extends BaseCreator {
    constructor(scene: THREE.Scene) {
        super(scene);
    }

    public drawSupports(supports: Array<Support>): void {
        supports.forEach(s => this.drawSupport(s.location));
    }

    private drawSupport(location: Point3D): void {

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(-width / 2, 0);
        shape.lineTo(-width / 2, bodyHeight);
        shape.lineTo(0, bodyHeight + headHeight);
        shape.lineTo(width / 2, bodyHeight);
        shape.lineTo(width / 2, 0);
        shape.lineTo(0, 0);

        const extrudeSettings = getExtrudeSettings(length);

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.rotateY(Math.PI / 2);

        geometry.translate(0, -headHeight - bodyHeight, location.z);

        const mesh = new THREE.Mesh(geometry, materialSupport);

        this.scene.add(mesh);
    }
}
