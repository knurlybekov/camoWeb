//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the clothe move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'clothe';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
// Load the PNG texture
const modelTexture = textureLoader.load('camo.png');

// ... [Your existing imports and initializations]

// // Load the PNG texture
// const textureLoader = new THREE.TextureLoader();
// const backgroundTexture = textureLoader.load('pine-timber-guide-0.jpg');
//
// // Create a large plane geometry for the background
// const backgroundGeometry = new THREE.PlaneGeometry(500, 500); // Adjust size as needed
// const backgroundMaterial = new THREE.MeshBasicMaterial({
//   map: backgroundTexture,
//   side: THREE.DoubleSide
// });
// const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
//
// // Position and add the background mesh to the scene
// backgroundMesh.position.set(0, 0, -500); // Adjust position as needed
// scene.add(backgroundMesh);

// ... [Rest of your code]



//Load the file
loader.load(
  `models/${objToRender}/cloth.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.traverse(function (child) {
      if (child.isMesh) {
        // Apply the texture to each mesh in the model
        child.material.map = modelTexture;
        child.material.needsUpdate = true;
      }
    });
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "clothe" ? 2  : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xFFF1E0, 0.7); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "clothe" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "clothe") {
  controls = new OrbitControls(camera, renderer.domElement);
}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the clothe move
  if (object && objToRender === "clothe") {
    //I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// //add mouse position listener, so we can make the clothe move
// document.onmousemove = (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
// }

//Start the 3D rendering
animate();