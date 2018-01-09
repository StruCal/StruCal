import * as THREE from 'three';

export const color = 0x3276B1;
// export const material = new THREE.MeshBasicMaterial( { color: 0x3276B1 } );
//export const material = new THREE.MeshPhongMaterial( { color: 0x3276B1 } );

export const material = new THREE.MeshPhongMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
    color: color,
});
