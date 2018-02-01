import * as THREE from 'three';

export const color = 0x3276B1;
// export const material = new THREE.MeshBasicMaterial( { color: 0x3276B1 } );
//export const material = new THREE.MeshPhongMaterial( { color: 0x3276B1 } );

export const material = new THREE.MeshPhongMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
    color: color,
    //wireframe: true,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
});

export const materialLoad = new THREE.MeshPhongMaterial({
    color: color,
});
