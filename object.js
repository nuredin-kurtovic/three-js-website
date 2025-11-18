import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, controls;
let truckModel = null;
let rotationVelocity = 0;

// initialize
init();
animate();

function init() {
    const viewer = document.querySelector(".viewer");
    const viewerWidth = viewer.clientWidth;
    const viewerHeight = viewer.clientHeight;

    // Scene (transparent background)
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(60, viewerWidth / viewerHeight, 0.5, 5000);
    camera.position.set(300, 200, 300);

    // Renderer
    const canvas = document.getElementById("three-canvas");
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(viewerWidth, viewerHeight);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = false;
    controls.enableZoom = false;


    // ⭐ PERFECT BALANCED LIGHTING ⭐

    // Key light (main)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(200, 300, 200);
    scene.add(keyLight);

    // Fill light (soft light from opposite side)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-200, 150, 200);
    scene.add(fillLight);

    // Back light (rim highlight)
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 250, -200);
    scene.add(backLight);

    // Ambient light (soft global light)
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);


    // Load model
    loadModel();

    // Events
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", rotateOnScroll);
}

function loadModel() {
    const loader = new GLTFLoader();

    loader.load("truck.glb", (gltf) => {
        truckModel = gltf.scene;

        // Scale & center
        truckModel.scale.set(100, 100, 100);
        truckModel.position.set(0, 0, 0);

        scene.add(truckModel);
    });
}

function rotateOnScroll(event) {
    if (!truckModel) return;
    rotationVelocity += event.deltaY * 0.0005;
}

function onResize() {
    const viewer = document.querySelector(".viewer");
    const viewerWidth = viewer.clientWidth;
    const viewerHeight = viewer.clientHeight;

    camera.aspect = viewerWidth / viewerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(viewerWidth, viewerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (truckModel) {
        truckModel.rotation.y += rotationVelocity;
        rotationVelocity *= 0.9; // Smooth slowdown
    }

    controls.update();
    renderer.render(scene, camera);
}


