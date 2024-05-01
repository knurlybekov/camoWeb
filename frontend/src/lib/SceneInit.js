import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasId) {
    // Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
    this.spotlight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.y = 9;
    this.camera.position.z = 36;

    // Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.stats = Stats();
    //document.body.appendChild(this.stats.dom); For stat data (Un-comment if needed)

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xfafafa, 0.5);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 10, 10);
    this.scene.add(this.directionalLight);

    // Spotlight
    this.spotlight = new THREE.SpotLight(0xffffff, 1);
    this.spotlight.position.set(0, 20, 0); // on top of the cube
    this.spotlight.angle = Math.PI / 4;
    this.spotlight.penumbra = 0.05;
    this.spotlight.decay = 2;
    this.spotlight.distance = 200;
    this.spotlight.castShadow = true;
    this.scene.add(this.spotlight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  animate() {
    // Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
  }

  render() {
    // Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
