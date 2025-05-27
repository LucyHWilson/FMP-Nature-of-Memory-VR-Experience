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
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  document.body.appendChild(renderer.domElement);
  document.body.appendChild(VRButton.createButton(renderer));

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('assets/IMAGE.jpg', function (texture) {
    // Set correct color space so image isn't lightened
    texture.encoding = THREE.sRGBEncoding;

    // Use equirectangular mapping for 360 background
    texture.mapping = THREE.EquirectangularReflectionMapping;

    // Improve texture sharpness
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    scene.background = texture;
  });

  // NO lights at all to keep image contrast as-is
}

function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
