import { MovingLoad } from '../../../common/movingLoad/movingLoad';
import * as THREE from 'three';
import { material } from '../material';

const elevation = 4;

const headHeight = 0.7;
const headRadious = 0.3;
const tailHeight = 0.7;
const tailRadious = 0.15;

export class MovingLoadCreator {
    private movingLoad: MovingLoad;
    private previousPosition: number = 0;

    arrowMeshes: Array<THREE.Mesh> = [];

    constructor(private scene: any) { }

    public start(movingLoad: MovingLoad): void {
        this.arrowMeshes = [];
        this.movingLoad = movingLoad;

        movingLoad.forces.forEach(load => this.createArrow(load.basePosition));
    }

    public tickAnimation(time: number) {
        if (time === 0){
            this.previousPosition = 0;
        }


        const position = this.movingLoad.speed * (time);
        const delta = position - this.previousPosition;

        this.arrowMeshes.forEach(mesh => mesh.translateZ(delta));

        this.previousPosition = position;

    }

    private createArrow(baseZ: number): any {
        const headGeometry = new THREE.ConeGeometry(headRadious, headHeight);
        const headMesh = new THREE.Mesh(headGeometry, material);
        headGeometry.rotateX(Math.PI);
        headGeometry.translate(0, elevation, baseZ);

        const tailGeometry = new THREE.CylinderGeometry(tailRadious, tailRadious, tailHeight);
        const tailMesh = new THREE.Mesh(tailGeometry, material);
        tailGeometry.translate(0, headHeight + elevation, baseZ);


        this.arrowMeshes.push(headMesh);
        this.arrowMeshes.push(tailMesh);
        this.scene.add(headMesh);
        this.scene.add(tailMesh);

    }
}
