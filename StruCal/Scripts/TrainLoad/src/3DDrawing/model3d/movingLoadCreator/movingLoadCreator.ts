import { MovingLoad } from '../../../common/movingLoad/movingLoad';
import * as THREE from 'three';
import { materialLoad } from '../material';

const elevation = 4;

const headHeight = 0.7;
const headRadious = 0.3;
const tailHeight = 0.7;
const tailRadious = 0.15;

export class MovingLoadCreator {
    private movingLoad: MovingLoad;
    private previousPosition = 0;
    private arrowBasePositionMap: Map<THREE.Mesh, number>;
    private structureLength: number;

    constructor(private scene: THREE.Scene) { }

    public start(movingLoad: MovingLoad, structureLength: number): void {
        this.structureLength = structureLength;
        this.reset();
        this.arrowBasePositionMap = new Map<THREE.Mesh, number>();
        this.movingLoad = movingLoad;

        movingLoad.forces.forEach(load => this.createArrow(load.basePosition));
    }

    public tickAnimation(time: number) {
        if (time === 0) {
            this.resetPositions();
            this.previousPosition = 0;
        }

        const position = this.movingLoad.speed * (time);
        const delta = position - this.previousPosition;

        this.arrowBasePositionMap.forEach((value, mesh) => {
            mesh.translateZ(delta);
            mesh.visible = mesh.position.z >= 0 && mesh.position.z <= this.structureLength;
        });

        this.previousPosition = position;
    }

    private resetPositions() {
        this.arrowBasePositionMap.forEach((position, mesh) => {
            mesh.position.set(0, 0, position);
        });
    }

    public reset() {
        if (this.arrowBasePositionMap === undefined) {
            return;
        }
        this.arrowBasePositionMap.forEach((value, mesh) => {
            this.scene.remove(mesh);
        });
    }

    private createArrow(baseZ: number): any {
        const headGeometry = new THREE.ConeGeometry(headRadious, headHeight);
        const headMesh = new THREE.Mesh(headGeometry, materialLoad);
        headGeometry.rotateX(Math.PI);
        headGeometry.translate(0, elevation, 0);
        headMesh.translateZ(baseZ);
        headMesh.visible = false;

        const tailGeometry = new THREE.CylinderGeometry(tailRadious, tailRadious, tailHeight);
        const tailMesh = new THREE.Mesh(tailGeometry, materialLoad);
        tailGeometry.translate(0, headHeight + elevation, 0);
        tailMesh.translateZ(baseZ);
        tailMesh.visible = false;

        this.arrowBasePositionMap.set(headMesh, baseZ);
        this.arrowBasePositionMap.set(tailMesh, baseZ);
        this.scene.add(headMesh);
        this.scene.add(tailMesh);

    }
}
