import { CanvasHelper } from "../canvasHelper/canvasHelper";
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
const TrackballControls = require('three-trackballcontrols');
const canvasId = "canvas3d";

export class Model3dCreator {
    private canvasHelper: CanvasHelper;
    private scene: any;
    private camera: any;
    constructor() {
        
    }

    public Create():void{
        const canvas = document.getElementById(canvasId);
        this.canvasHelper = new CanvasHelper(canvas);

        this.scene = new THREE.Scene();


        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.canvasHelper.width, this.canvasHelper.height);
        canvas.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
        const face1 = geometry.faces[0];
        face1.vertexColors[0] = new THREE.Color('#112156');
        face1.vertexColors[1] = new THREE.Color('#ff2166');
        face1.vertexColors[2] = new THREE.Color('#ff2186');

        var material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide
        });
        var cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.camera = new THREE.PerspectiveCamera(45, this.canvasHelper.widthHeightRatio, 0.1, 1000);
        this.camera.position.z = 5;
        const controls = new OrbitControls(this.camera, renderer.domElement);
        //const controls = new TrackballControls(this.camera);


        let counter = 0;
        const animate = () => {

            requestAnimationFrame(animate);
            if (counter === 4) {
                //cube.rotation.x += 0.1;
                cube.rotation.y += 0.1;
                counter = 0;
            }
            counter++;
            controls.update();
            renderer.render(this.scene, this.camera);
        };

        animate();
    }

    public GetScene():any{
        return this.scene;
    }
}