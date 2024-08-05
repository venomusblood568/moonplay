// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.getElementById("lorenz-attractor").appendChild(renderer.domElement);

// Lorenz attractor
const colorStart = new THREE.Color('cyan');
const colorEnd = new THREE.Color('purple');
const points = [];
const dt = 0.01;
const sigma = 10;
const beta = 8 / 3;
const rho = 28;
let x = 0.1,
  y = 0,
  z = 0;

const geometry1 = new THREE.BufferGeometry();
const vertices1 = [];
const colors1 = [];

for (let i = 0; i < 10000; i++) {
  const dx = sigma * (y - x) * dt;
  const dy = (x * (rho - z) - y) * dt;
  const dz = (x * y - beta * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  vertices1.push(x, y, z);

  // Gradient calculation
  const color = colorStart.clone().lerp(colorEnd, i / 10000);
  colors1.push(color.r, color.g, color.b);
}

geometry1.setAttribute('position', new THREE.Float32BufferAttribute(vertices1, 3));
geometry1.setAttribute('color', new THREE.Float32BufferAttribute(colors1, 3));

const material1 = new THREE.LineBasicMaterial({ vertexColors: true });
const line1 = new THREE.Line(geometry1, material1);
scene.add(line1);

// Aizawa attractor
const a = 0.95;
const b = 0.7;
const c = 0.6;
const d = 3.5;
const e = 0.25;
const f = 0.1;
let x2 = 0.1,
  y2 = 0,
  z2 = 0;

const aizawaPoints = [];
const geometry2 = new THREE.BufferGeometry();
const vertices2 = [];
const colors2 = [];

for (let i = 0; i < 5000; i++) {
  const dx2 = (z2 - b) * x2 - d * y2;
  const dy2 = d * x2 + (z2 - b) * y2;
  const dz2 = c + a * z2 - (Math.pow(z2, 3) / 3) - (Math.pow(x2, 2) + Math.pow(y2, 2)) * (1 + e * z2) + f * Math.pow(z2, 2) * x2;

  x2 += dt * dx2;
  y2 += dt * dy2;
  z2 += dt * dz2;

  vertices2.push(x2 * 5, y2 * 5, z2 * 5);

  // Gradient calculation
  const color = colorStart.clone().lerp(colorEnd, i / 5000);
  colors2.push(color.r, color.g, color.b);
}

geometry2.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));
geometry2.setAttribute('color', new THREE.Float32BufferAttribute(colors2, 3));

const material2 = new THREE.LineBasicMaterial({ vertexColors: true });
const line2 = new THREE.Line(geometry2, material2);
scene.add(line2);

// Animation
let numPoints1 = 0;
let numPoints2 = 0;

const drawPortion = (numPoints, vertices, geometry) => {
  const portionVertices = vertices.slice(0, numPoints * 3);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(portionVertices, 3));
};

const animate = () => {
  requestAnimationFrame(animate);

  numPoints1 = Math.min(numPoints1 + 1, vertices1.length / 3);
  numPoints2 = Math.min(numPoints2 + 1, vertices2.length / 3);

  drawPortion(numPoints1, vertices1, geometry1);
  drawPortion(numPoints2, vertices2, geometry2);

  line1.rotation.x += 0.005;
  line1.rotation.y += 0.005;
  line1.rotation.z += 0.005;
  if (line1.scale.x < 2) {
    line1.scale.multiplyScalar(1.0005);
  }

  line2.rotation.x += 0.005;
  line2.rotation.y += 0.005;
  line2.rotation.z += 0.005;
  if (line2.scale.x < 2) {
    line2.scale.multiplyScalar(1.0005);
  }

  renderer.render(scene, camera);
};

animate();
