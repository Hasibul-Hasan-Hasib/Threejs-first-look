import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';



const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


//controls
const orbit = new OrbitControls(camera,renderer.domElement)



// camera position;
camera.position.set(-10,30,30);
orbit.update();



// helpers
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30,30);
scene.add(gridHelper);




// objects
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color:'green',
    side: THREE.DoubleSide,    
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);



const boxGeometry = new THREE.BoxGeometry(5,5,5);
const boxMaterial = new THREE.MeshBasicMaterial({color:'white'});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);
const boxGeometry2 = new THREE.BoxGeometry(5,5,5);
const boxMaterial2 = new THREE.MeshBasicMaterial({color:'cyan'});
const box2 = new THREE.Mesh(boxGeometry2,boxMaterial2);
scene.add(box2);



const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color:'red',
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);


sphere.position.set(-10,10,0)

const gui = new dat.GUI();

const options = {
    sphereColor: '#fff',
    wireframe: false,
    speed: 0.05,
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
})


gui.add(options,'wireframe').onChange(e => {
    sphere.material.wireframe = e
})


gui.add(options,'speed',0,0.1);


let step = 0;



function animate(time){
    box.rotation.x = time/250;
    box.rotation.y = time/250;
    box2.rotation.x = time/200;
    box2.rotation.y = time/200;
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);

renderer.render(scene,camera);