import { Directive, ElementRef } from '@angular/core';
import { CanvasHelper } from '../canvasHelper/canvasHelper'

import * as THREE from 'three';
import { View3dService } from './view3d.service';
const OrbitControls = require('three-orbit-controls')(THREE);

@Directive({
  selector: '[canvas3d]'
})
export class Canvas3dDirective {
  private view3dService: View3dService;
  private canvasHelper: CanvasHelper;
  private scene: any;
  private camera: any;
  constructor(canvas: ElementRef, view3dService: View3dService) {

    this.view3dService = view3dService;
    this.canvasHelper = new CanvasHelper(canvas);

    this.scene = new THREE.Scene();
    //this.scene = view3dService.getScene();
    this.view3dService.ApplyScene(this.scene);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.canvasHelper.width, this.canvasHelper.height);
    canvas.nativeElement.appendChild(renderer.domElement);

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

    this.camera = new THREE.PerspectiveCamera(75, this.canvasHelper.widthHeightRatio, 0.1, 1000);
    this.camera.position.z = 5;
    const controls = new OrbitControls(this.camera, renderer.domElement);


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

}
