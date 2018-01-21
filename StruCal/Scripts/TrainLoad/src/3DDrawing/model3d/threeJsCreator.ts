import * as THREE from 'three';
import { CanvasHelper } from '../../common/canvasHelper/canvasHelper';

const OrbitControls = require('three-orbit-controls')(THREE);
const TrackballControls = require('three-trackballcontrols');
const Stats = require('stats-js');
const canvasId = 'canvas3d';
const widthHeightRatio = 3;



export class ThreeJsCreator {
    private canvasHelper: CanvasHelper;
    private _scene: any;
    private camera: any;

    public tickAnimation = () => { };

    constructor() {
    }

    public create(): void {
        const canvas = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvas, widthHeightRatio);

        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0xFFFFFF);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.canvasHelper.width, this.canvasHelper.height);
        canvas.appendChild(renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, this.canvasHelper.widthHeightRatio, 0.1, 1000);
        this.camera.position.z = -40;
        this.camera.position.x = 20;
        const controls = new OrbitControls(this.camera, renderer.domElement);
        // const controls = new TrackballControls(this.camera);

        this.addLighting();

        const sphereAxis = new THREE.AxisHelper(20);
        this._scene.add(sphereAxis);


        const panelBody = document.getElementById('panelBody');
        const stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        panelBody.appendChild(stats.domElement);

        let counter = 0;
        const animate = () => {

            requestAnimationFrame(animate);
            if (counter === 5) {
                this.tickAnimation();
                counter = 0;
            }
            counter++;
            controls.update();
            renderer.render(this._scene, this.camera);
            stats.update();
        };

        animate();
    }

    public get scene(): any {
        return this._scene;
    }

    private addLighting(): void {
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(100, 100, 100);
        directionalLight1.target.position.set(0, 0, 0);
        this._scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(100, -100, 100);
        directionalLight2.target.position.set(0, 0, 0);
        this._scene.add(directionalLight2);

        const light = new THREE.AmbientLight(0xffffff); // soft white light
        this._scene.add(light);

    }

}
