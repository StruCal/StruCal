import { CanvasHelper } from '../canvasHelper/canvasHelper';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
const TrackballControls = require('three-trackballcontrols');
const canvasId = 'canvas3d';

export class Model3dCreator {
    private canvasHelper: CanvasHelper;
    private scene: any;
    private camera: any;
    constructor() {

    }

    public Create(): void {
        const canvas = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvas);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.canvasHelper.width, this.canvasHelper.height);
        canvas.appendChild(renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, this.canvasHelper.widthHeightRatio, 0.1, 1000);
        this.camera.position.z = 10;
        const controls = new OrbitControls(this.camera, renderer.domElement);
        // const controls = new TrackballControls(this.camera);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(1000, 1000, 1000);
        this.scene.add(directionalLight2);

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );

        const sphereAxis = new THREE.AxisHelper(20);
        this.scene.add(sphereAxis);

        let counter = 0;
        const animate = () => {

            requestAnimationFrame(animate);
            if (counter === 4) {
                counter = 0;
            }
            counter++;
            controls.update();
            renderer.render(this.scene, this.camera);
        };

        animate();
    }

    public GetScene(): any {
        return this.scene;
    }
}
