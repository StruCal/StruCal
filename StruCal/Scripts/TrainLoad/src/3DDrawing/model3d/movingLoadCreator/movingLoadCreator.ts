import { MovingLoad } from '../../../common/movingLoad/movingLoad';
import * as THREE from 'three';
import { material } from '../material';

const headHeight = 0.5;
const headRadious = 1;
const tailHeight = 0.5;
const tailRadious = 0.5;

export class MovingLoadCreator {
    private movingLoad: MovingLoad;

    arrowGeometries: Array<any> = [];

    constructor(private scene: any) { }

    public start(movingLoad: MovingLoad): void {
        this.arrowGeometries = [];
        this.movingLoad = movingLoad;
 
        movingLoad.forces.forEach(load => this.createArrow(load.basePosition));
    }

    public tickAnimation(time: number) {
        const movement = this.movingLoad.speed * (time);

    }

    private createArrow(baseZ: number): any {
        const headGeometry = new THREE.ConeGeometry(headRadious, headHeight);
        const headMesh = new THREE.Mesh(headGeometry, material);
        headGeometry.rotateX(Math.PI);
        headGeometry.translate(0, 0, baseZ);

        const tailGeometry = new THREE.CylinderGeometry(tailRadious, tailRadious, tailHeight);
        const tailMesh = new THREE.Mesh(tailGeometry, material);
        tailGeometry.translate(0, headHeight, 0);
        tailGeometry.translate(0, 0, baseZ);

        this.arrowGeometries.push(headGeometry);
        this.arrowGeometries.push(tailGeometry);
        this.scene.add(headMesh);
        this.scene.add(tailMesh);

    }
}
