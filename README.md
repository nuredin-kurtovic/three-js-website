# Three.js + Tailwind CSS v3 Project

A starter setup using **Three.js** for 3D graphics and **Tailwind CSS v3.x** (NOT v4).

---

## 🚀 Installation

### 1. Clone the repository
git clone https://github.com/your-username/your-repo.git  
cd your-repo

### 2. Install dependencies
npm install

### 3. Install Three.js
npm install three

### 4. Install Tailwind CSS **v3 specifically**
npm install -D tailwindcss@3 postcss autoprefixer

Initialize Tailwind:
npx tailwindcss init -p

This creates:
- tailwind.config.js  
- postcss.config.js

---

## 🎨 Tailwind v3 Setup

### tailwind.config.js (correct for v3)
module.exports = {  
  content: [  
    "./index.html",  
    "./src/**/*.{js,ts,jsx,tsx}"  
  ],  
  theme: {  
    extend: {},  
  },  
  plugins: [],  
};

### Add Tailwind directives to your CSS
Inside `src/style.css`:

@tailwind base;  
@tailwind components;  
@tailwind utilities;

---

## 🧩 Example Three.js Setup

Inside `src/main.js`:

import * as THREE from "three";

const scene = new THREE.Scene();  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
const renderer = new THREE.WebGLRenderer();  

renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);

function animate() {  
  requestAnimationFrame(animate);  
  renderer.render(scene, camera);  
}  
animate();

---

## 🏃 Tailwind Watch Mode
npx tailwindcss -i ./src/style.css -o ./dist/style.css --watch

---

## 📁 Suggested Project Structure

your-project/  
├── index.html  
├── src/  
│   ├── main.js  
│   └── style.css  
├── dist/  
├── tailwind.config.js  
├── postcss.config.js  
└── package.json

---

## ✔️ Done!
Setup complete with **Tailwind v3**, NOT v4.
