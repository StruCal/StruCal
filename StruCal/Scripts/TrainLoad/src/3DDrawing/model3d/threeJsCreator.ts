import * as THREE from 'three';
import { CanvasHelper } from '../../common/canvasHelper/canvasHelper';
import { isProduction } from '../../../buildScripts/buildType';

const OrbitControls = require('three-orbit-controls')(THREE);
const TrackballControls = require('three-trackballcontrols');
const Stats = require('stats-js');
const canvasId = 'canvas3d';
const widthHeightRatio = 3;



export class ThreeJsCreator {
    private canvasHelper: CanvasHelper;
    private _scene: any;
    private camera: any;
    private stats: any;
    public tickAnimation = () => { };

    constructor() {
    }

    public create(): void {
        const canvas = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvas, widthHeightRatio);

        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0xf5f5f5);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.canvasHelper.width, this.canvasHelper.height);
        canvas.appendChild(renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, this.canvasHelper.widthHeightRatio, 0.1, 1000);
        this.camera.position.z = -40;
        this.camera.position.x = 20;
        const controls = new OrbitControls(this.camera, renderer.domElement);
        // const controls = new TrackballControls(this.camera);

        this.addLighting();
        this.addStats();
        this.addAxes();

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
            this.stats.update();
        };

        animate();
    }

    public get scene(): any {
        return this._scene;
    }

    private addAxes(): void {
        if (isProduction) {
            return;
        }
        const sphereAxis = new THREE.AxisHelper(20);
        this._scene.add(sphereAxis);
    }

    private addStats(): void {
        if (isProduction) {
            this.stats = {};
            this.stats.update = () => { };
            return;
        }
        const panelBody = document.getElementById('panelBody');
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        panelBody.appendChild(this.stats.domElement);

    }

    private addLighting(): void {
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(0, 100, 100);
        directionalLight1.target.position.set(0, 0, 0);
        this._scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(0, -100, 100);
        directionalLight2.target.position.set(0, 0, 100);
        this._scene.add(directionalLight2);

        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        this.scene.add(light);


    }

}
