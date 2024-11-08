import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.getElementById("background-scene").appendChild(renderer.domElement);

renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100vh";

const pointLight = new THREE.PointLight(0xffffff, 2, 2000);
pointLight.position.set(0, 200, 300);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 10000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
  posArray[i] = (Math.random() - 0.5) * 2000;
  posArray[i + 1] = (Math.random() - 0.5) * 1200;
  posArray[i + 2] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load(
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/sprites/disc.png"
);

const particlesMaterial = new THREE.PointsMaterial({
  map: starTexture,
  color: 0xffffff,
  size: 1,
  opacity: 0.9,
  transparent: true,
  depthWrite: false,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

function createPlanet(size, texturePath, positionX, positionY, positionZ) {
  const planetGeometry = new THREE.SphereGeometry(size, 64, 64);
  const textureLoader = new THREE.TextureLoader();

  const planetMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texturePath),
    transparent: false,
    opacity: 1,
    depthWrite: true,
    depthTest: true,
  });

  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.position.set(positionX, positionY, positionZ);
  planet.castShadow = true;
  planet.receiveShadow = true;
  scene.add(planet);

  return {
    mesh: planet,
    originalX: positionX,
    originalY: positionY,
    originalZ: positionZ,
  };
}

const earth = createPlanet(40, "Images/2k_earth_daymap.jpg", -150, 150, -250);
const mars = createPlanet(20, "Images/2k_mars.jpg", 50, -150, -150);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener("mousemove", (event) => {
  targetX = (event.clientX - windowHalfX) * 0.001;
  targetY = (event.clientY - windowHalfY) * 0.001;
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);

  mouseX += (targetX - mouseX) * 0.02;
  mouseY += (targetY - mouseY) * 0.02;

  particles.rotation.y = mouseX * 0.5;
  particles.rotation.x = mouseY * 0.5;

  const maxMovementX = window.innerWidth / 3;
  const maxMovementY = window.innerHeight / 3;

  earth.mesh.position.x = THREE.MathUtils.clamp(
    earth.originalX + mouseX * maxMovementX,
    -maxMovementX,
    maxMovementX
  );
  earth.mesh.position.y = THREE.MathUtils.clamp(
    earth.originalY + mouseY * maxMovementY,
    -maxMovementY,
    maxMovementY
  );

  mars.mesh.position.x = THREE.MathUtils.clamp(
    mars.originalX + mouseX * maxMovementX,
    -maxMovementX,
    maxMovementX
  );
  mars.mesh.position.y = THREE.MathUtils.clamp(
    mars.originalY + mouseY * maxMovementY,
    -maxMovementY,
    maxMovementY
  );

  earth.mesh.rotation.y += 0.005;
  mars.mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function createShootingStar() {
  const starGeometry = new THREE.SphereGeometry(1, 16, 16);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const shootingStar = new THREE.Mesh(starGeometry, starMaterial);

  const startX = (Math.random() - 0.5) * window.innerWidth;
  const startY = (Math.random() - 0.5) * window.innerHeight;
  shootingStar.position.set(startX, startY, -500);

  const angle = Math.random() * Math.PI * 2;
  const distance = 1500;

  const endX = startX + Math.cos(angle) * distance;
  const endY = startY + Math.sin(angle) * distance;

  scene.add(shootingStar);

  const trailPoints = [];
  const trailLength = 10;
  for (let i = 0; i < trailLength; i++) {
    trailPoints.push(new THREE.Vector3(startX, startY, -500));
  }

  const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
  const trailMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
  });
  const trail = new THREE.Line(trailGeometry, trailMaterial);
  scene.add(trail);

  const duration = 1;
  const startTime = performance.now();

  function animateShootingStar() {
    const elapsed = (performance.now() - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);

    shootingStar.position.x = startX + (endX - startX) * progress;
    shootingStar.position.y = startY + (endY - startY) * progress;

    trailPoints.pop();
    trailPoints.unshift(shootingStar.position.clone());
    trail.geometry.setFromPoints(trailPoints);

    if (progress < 1) {
      requestAnimationFrame(animateShootingStar);
    } else {
      scene.remove(shootingStar);
      scene.remove(trail);
    }
  }

  animateShootingStar();
}

setInterval(createShootingStar, 4000);
animate();
