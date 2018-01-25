import * as THREE from 'three';

export class BaseCreator {
    protected scene: any;

    constructor(scene: any) {
        this.scene = scene;
    }

    protected clearGeometry(): void {
        const geometryObjects = this.scene.children.filter(e => e.isMesh);
        

        for (const geometry of geometryObjects) {
            this.scene.remove(geometry);
        }

        // while (this.scene.children.length > 0) {
        //     this.scene.remove(this.scene.children[0]);
        // }
    }
}
