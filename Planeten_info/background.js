import './../style.css'

import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { OutlinePass } from 'three/examples/jsm/Addons.js';



//Erstellen der 3D Szene
const scene = new THREE.Scene();

//Festlegen der Perspektive
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 2000);
const camerahelp = new THREE.Object3D();

camerahelp.position.set(0, 50, 80);




//Definition des rendering Bereichs
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);




const renderScene = new RenderPass(scene, camera);




const composer = new EffectComposer(renderer);

composer.addPass(renderScene);


const outline = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outline.edgeThickness = 1.0;
outline.edgeStrength = 2.0;
outline.visibleEdgeColor.set(0xffffff);


const textureLoader = new THREE.TextureLoader();
textureLoader.load("three/examples/textures/tri_pattern.jpg", function(texture) {
    if (texture) {
        outline.patternTexture = texture;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

    }

});

composer.addPass(outline);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.6,
    0.1,
    0.1,
);

composer.addPass(bloomPass);





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Definition für die Dicke aller Orbitringe
const orbitring = 0.4;


// Definition eines Sonnensystems
const Solarsystem = new THREE.Object3D();
scene.add(Solarsystem);

const Visuals = new THREE.Object3D();

scene.add(Visuals)


// Weltall mit richtigen Sternen versehen
function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(2000));

    star.position.set(x, y, z);

    scene.add(star)

}

Array(1600).fill().forEach(addStar)


//Weltall Hintergrundbild
// const WeltallTextur = new THREE.TextureLoader().load('8k_stars.jpg');
// scene.background = WeltallTextur;

// fragt ab ob das Browser Fenster sich in der Größe verändert



// ██████  ███████ ███████ ██ ███████ ███████ 
// ██   ██ ██      ██      ██    ███  ██      
// ██████  █████   ███████ ██   ███   █████   
// ██   ██ ██           ██ ██  ███    ██      
// ██   ██ ███████ ███████ ██ ███████ ███████ 






// Funktion wird bei Größenänderung des Browser-fensters ausgelöst
function onWindowResize() {


    // V<erhindert das Verzerren der render Perspektive bei einem Window resize
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Passt die rendering Szene an die Fenstergröße an
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);


}

window.addEventListener('resize', onWindowResize, false);
window.requestAnimationFrame(animate);


// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 


var timemod = 1.0;
camera.position.set(camerahelp.position.x, camerahelp.position.y, camerahelp.position.z);
const clock = new THREE.Clock();


//finale Rendering function
function animate() {
    requestAnimationFrame(animate);

    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.render(scene, camera);
    composer.render();
}

animate()