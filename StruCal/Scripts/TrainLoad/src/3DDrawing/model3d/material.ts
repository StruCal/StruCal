import * as THREE from 'three';

export const color = 0x3276B1;
export const supportColor = 0x726d6d;


export const material = new THREE.MeshLambertMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
    color: color,
});

export const materialLoad = new THREE.MeshLambertMaterial({
    color: color,
});

export const materialSupport = new THREE.MeshBasicMaterial({
    color: supportColor,
    transparent: true,
    opacity: 0.3,
});
