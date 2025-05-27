import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/webxr/VRButton.js';

let camera, scene, renderer;

document.getElementById("startButton").onclick = () => {
  document.getElementById("bg-music").play();
  document.getElementById("startButton").style.display = "none";

  init();
  animate();
};

function init() {
  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 0); // Typical VR eye height

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(VRButton.createButton(renderer));

  // Load the 360° equirectangular image as a skybox
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('assets/render_vr_(r7680x3840).jpg', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
  });

  // Add subtle ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
}

function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
