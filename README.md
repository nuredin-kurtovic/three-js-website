### 1. Install dependencies
npm install

### 2. Install Three.js
npm install three

### 3. Install Tailwind CSS **v3 specifically**
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
Inside `src/styles.css`:

@tailwind base;  
@tailwind components;  
@tailwind utilities;

-------------------------
Inside `dist add styles.css`:

---

## 🏃 Tailwind Watch Mode

Inside package.json scripts

"build:css": "tailwindcss -i ./src/styles.css -o ./dist/styles.css --watch"

Terminal: npm run build:css
---

## ✔️ Done!
Setup complete with **Tailwind v3**, NOT v4.
