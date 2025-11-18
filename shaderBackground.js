import * as THREE from "three";

// --- GLSL SHADER CODE ---
// We write the shaders as strings here.
// This is a simple 2D noise function to create a "fog" or "cloud" texture.

const vertexShader = `
    // This is a "pass-through" shader.
    // It just passes the UV coordinates (vUv) to the fragment shader.
    varying vec2 vUv;
    void main() {
        vUv = uv;
        // This is a common trick for full-screen shaders:
        // It maps the 2x2 plane directly to the screen,
        // ignoring the camera.
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform float u_time; // We'll pass in time to animate the fog

    // --- Simple 2D Random function ---
    // (Generates a pseudo-random number from a 2D vector)
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // --- Simple 2D Noise function (based on random) ---
    // (Blends random values to create a smooth, "cloudy" noise)
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Mix 4 corner random values
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smoothly blend them
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
    }

    void main() {
        // --- Create the Fog Effect ---
        
        // 1. Scale the UVs and animate over time
        //    (Play with 'vUv * 3.0' - smaller numbers = "larger" fog clouds)
        //    (Play with 'u_time * 0.05' - smaller numbers = slower animation)
        vec2 st = vUv * 3.0; 
        st.x += u_time * 0.05;

        // 2. Get the noise value (between 0.0 and 1.0)
        float n = noise(st);

        // 3. Set the color and opacity
        //    We use the noise 'n' as the alpha (opacity).
        //    (Play with 'n * 0.15' - smaller numbers = more transparent fog)
        gl_FragColor = vec4(1.0, 1.0, 1.0, n * 0.15); // White fog, 15% max opacity
    }
`;


// --- THREE.JS SETUP ---

export function createBackground(container) {
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent
    
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-10";

    container.appendChild(renderer.domElement);

    // --- REPLACED PARTICLE SYSTEM WITH SHADER PLANE ---

    const scene = new THREE.Scene();

    // We only need a very simple camera.
    // It's not really used because the vertex shader bypasses it.
    const camera = new THREE.Camera(); 

    // A simple 2x2 plane that will cover the entire screen
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Create the "uniforms" (variables we can pass to the shader)
    const uniforms = {
        u_time: { value: 0.0 }
    };

    // Create the shader material
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        transparent: true, // Make sure it's transparent
    });

    // Create the mesh and add it to the scene
    const fogPlane = new THREE.Mesh(geometry, material);
    scene.add(fogPlane);

    // Use a clock to track elapsed time for animation
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        // Update the 'u_time' uniform with the elapsed time
        uniforms.u_time.value = clock.getElapsedTime();

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        // No camera updates are needed because the shader fills the screen
    });
}
