import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';
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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ███████  ██████  ███    ██ ███    ██ ███████ 
// ██      ██    ██ ████   ██ ████   ██ ██      
// ███████ ██    ██ ██ ██  ██ ██ ██  ██ █████   
//      ██ ██    ██ ██  ██ ██ ██  ██ ██ ██      
// ███████  ██████  ██   ████ ██   ████ ███████ 





// Definition Der Sonne
const sungeometry = new THREE.SphereGeometry(10, 30, 30, );

const sunTexture = new THREE.TextureLoader().load('planet_textures/2k_sun.jpg');
const sunmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: sunTexture, emissive: 0x0feb51d, emissiveIntensity: 0.5 });


const sun = new THREE.Mesh(sungeometry, sunmaterial);

Solarsystem.add(sun)

// Leuchten Der Sonne
const sunLight = new THREE.PointLight(0xffffff, 0.8, 400, -0.005)
sunLight.position.set(0, 0, 0)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.04)
scene.add(sunLight, ambientLight)

function sunclick() {



    if (clicked) {
        requestAnimationFrame(sunclick);


        mercmesh.visible = false
        venusmesh.visible = false
        earthmesh.visible = false
        marsmesh.visible = false
        jupmesh.visible = false
        satmesh.visible = false
        uramesh.visible = false
        nepmesh.visible = false
        satring.visible = false;


        Visuals.visible = false;
        sunLight.intensity = 0.1;
        ambientLight.intensity = 1;


        outline.edgeStrength = 0;



        // Update camera position to the midpoint
        camera.position.set(0, 0, 20)

        camera.lookAt(sunmesh.position);
        controls.target = sunmesh.position;

        timemod = 0.1;

    }
}



function Solarsystemclick() {

    clicked = false;

    sun.visible = true
    mercmesh.visible = true
    venusmesh.visible = true
    earthmesh.visible = true
    marsmesh.visible = true
    jupmesh.visible = true
    satmesh.visible = true
    uramesh.visible = true
    nepmesh.visible = true

    Solarsystem.visible = true;
    satring.visible = true;
    Visuals.visible = true;
    sunLight.intensity = 0.8;
    ambientLight.intensity = 0.04;


    outline.edgeStrength = 2.0;



    // Update camera position to the midpoint
    // camerahelp.position.set(0, 50, 80);
    camera.position.copy(camerahelp.position);

    camera.lookAt(scene.position);
    controls.target = scene.position;

    timemod = 1;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ███    ███ ███████ ██████  ██   ██ ██    ██ ██████  
// ████  ████ ██      ██   ██ ██  ██  ██    ██ ██   ██ 
// ██ ████ ██ █████   ██████  █████   ██    ██ ██████  
// ██  ██  ██ ██      ██   ██ ██  ██  ██    ██ ██   ██ 
// ██      ██ ███████ ██   ██ ██   ██  ██████  ██   ██ 



// Definition Aller Elemente Des Merkurs //

// const merc = new THREE.Object3D();
// Solarsystem.add(merc);

const mercgeometry = new THREE.SphereGeometry(3, 30, 30);
const mercTexture = new THREE.TextureLoader().load('planet_textures/2k_merc.png');
const mercmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: mercTexture });

const mercmesh = new THREE.Mesh(mercgeometry, mercmaterial);

mercmesh.position.set(40, 0, 0)

Solarsystem.add(mercmesh)

//Merkurumlaufbahn um die Sonne
const mercorbit = new THREE.TorusGeometry(40, orbitring, 20, 150);
const mercorbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const mercorbitring = new THREE.Mesh(mercorbit, mercorbitmat)
mercorbitring.rotation.x = (1.5707963267948966)

Visuals.add(mercorbitring)

function mercclick() {

    if (clicked) {
        requestAnimationFrame(mercclick);

        sun.visible = false

        venusmesh.visible = false
        earthmesh.visible = false
        marsmesh.visible = false
        jupmesh.visible = false
        satmesh.visible = false
        uramesh.visible = false
        nepmesh.visible = false
        satring.visible = false;


        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, mercmesh.position);
        midpoint.multiplyScalar(0.85);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(mercmesh.position);
        controls.target = mercmesh.position;

        timemod = 0.1;


    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ██    ██ ███████ ███    ██ ██    ██ ███████ 
// ██    ██ ██      ████   ██ ██    ██ ██      
// ██    ██ █████   ██ ██  ██ ██    ██ ███████ 
//  ██  ██  ██      ██  ██ ██ ██    ██      ██ 
//   ████   ███████ ██   ████  ██████  ███████ 



// Definition Aller Elemente Der Venus //

const venus = new THREE.Object3D();
Solarsystem.add(venus);

const venusgeometry = new THREE.SphereGeometry(4.5, 30, 30);
const venusTexture = new THREE.TextureLoader().load('planet_textures/2k_venus.png');
const venusmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: venusTexture });

const venusmesh = new THREE.Mesh(venusgeometry, venusmaterial);

venusmesh.position.set(65, 0, 0)

venus.add(venusmesh)

//Venusumlaufbahn um die Sonne
const venusorbit = new THREE.TorusGeometry(65, orbitring, 20, 150);
const venusorbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const venusorbitring = new THREE.Mesh(venusorbit, venusorbitmat)
venusorbitring.rotation.x = (1.5707963267948966)

Visuals.add(venusorbitring)

function venusclick() {

    if (clicked) {

        requestAnimationFrame(venusclick);

        sun.visible = false
        mercmesh.visible = false

        earthmesh.visible = false
        marsmesh.visible = false
        jupmesh.visible = false
        satmesh.visible = false
        uramesh.visible = false
        nepmesh.visible = false
        satring.visible = false;


        Visuals.visible = false;
        sunLight.intensity = 0.35;


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, venusmesh.position);
        midpoint.multiplyScalar(0.85);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(venusmesh.position);
        controls.target = venusmesh.position;

        timemod = 0.1;
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ███████ ██████  ██████  ███████ 
// ██      ██   ██ ██   ██ ██      
// █████   ██████  ██   ██ █████   
// ██      ██   ██ ██   ██ ██      
// ███████ ██   ██ ██████  ███████                             



// Definition Aller Elemente Der Erde //

const earth = new THREE.Object3D();

// earth.rotation.z = 0.05;
Solarsystem.add(earth);

const earthgeometry = new THREE.SphereGeometry(5, 30, 30, );
const earthTexture = new THREE.TextureLoader().load('planet_textures/Weltkugel3.jpg');
const earthmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: earthTexture });

const earthmesh = new THREE.Mesh(earthgeometry, earthmaterial);

earthmesh.position.set(90, 0, 0)

earth.add(earthmesh)

//Erdumlaufbahn um die Sonne
const earthorbit = new THREE.TorusGeometry(90, orbitring, 20, 150);
const earthorbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const earthorbitring = new THREE.Mesh(earthorbit, earthorbitmat)
earthorbitring.rotation.x = (1.5707963267948966)

Visuals.add(earthorbitring)



function earthclick() {


    if (clicked) {
        requestAnimationFrame(earthclick);

        sun.visible = false
        mercmesh.visible = false
        venusmesh.visible = false

        marsmesh.visible = false
        jupmesh.visible = false
        satmesh.visible = false
        uramesh.visible = false
        nepmesh.visible = false
        satring.visible = false;

        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, earthmesh.position);
        midpoint.multiplyScalar(0.90);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(earthmesh.position);
        controls.target = earthmesh.position;

        timemod = 0.1;

    }
}








// .___  ___.   ______   .__   __.  _______  
// |   \/   |  /  __  \  |  \ |  | |       \ 
// |  \  /  | |  |  |  | |   \|  | |  .--.  |
// |  |\/|  | |  |  |  | |  . `  | |  |  |  |
// |  |  |  | |  `--'  | |  |\   | |  '--'  |
// |__|  |__|  \______/  |__| \__| |_______/ 



// Definition Des Mondes //
const moonorbit = new THREE.Object3D();
moonorbit.position.set(90, 0, 0)

Visuals.add(moonorbit);

const moongeometry = new THREE.SphereGeometry(2, 20, 16, );
const moonTexture = new THREE.TextureLoader().load('planet_textures/2k_moon.jpg');
const moonmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: moonTexture });

const moon = new THREE.Mesh(moongeometry, moonmaterial);

moon.position.set(12, 0, 0)

moonorbit.add(moon)




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ███    ███  █████  ██████  ███████ 
// ████  ████ ██   ██ ██   ██ ██      
// ██ ████ ██ ███████ ██████  ███████ 
// ██  ██  ██ ██   ██ ██   ██      ██ 
// ██      ██ ██   ██ ██   ██ ███████ 




// Definition Aller Elemente Des Mars //

const mars = new THREE.Object3D();
Solarsystem.add(mars);

const marsgeometry = new THREE.SphereGeometry(4.5, 30, 30, );
const marsTexture = new THREE.TextureLoader().load('planet_textures/2k_mars.png');
const marsmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: marsTexture });

const marsmesh = new THREE.Mesh(marsgeometry, marsmaterial);

marsmesh.position.set(120, 0, 0)

mars.add(marsmesh)

//Marsumlaufbahn um die Sonne
const marsorbit = new THREE.TorusGeometry(120, orbitring, 20, 150);
const marsorbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const marsorbitring = new THREE.Mesh(marsorbit, marsorbitmat)
marsorbitring.rotation.x = (1.5707963267948966)

Visuals.add(marsorbitring)

function marsclick() {


    if (clicked) {

        requestAnimationFrame(marsclick);

        sun.visible = false
        mercmesh.visible = false
        venusmesh.visible = false
        earthmesh.visible = false

        jupmesh.visible = false
        satmesh.visible = false
        uramesh.visible = false
        nepmesh.visible = false
        satring.visible = false;

        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, marsmesh.position);
        midpoint.multiplyScalar(0.85);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(marsmesh.position);
        controls.target = marsmesh.position;

        timemod = 0.1;

    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





//  █████  ███████ ████████ ███████ ██████   ██████  ██ ██████  ███████ ███    ██ 
// ██   ██ ██         ██    ██      ██   ██ ██    ██ ██ ██   ██ ██      ████   ██ 
// ███████ ███████    ██    █████   ██████  ██    ██ ██ ██   ██ █████   ██ ██  ██ 
// ██   ██      ██    ██    ██      ██   ██ ██    ██ ██ ██   ██ ██      ██  ██ ██ 
// ██   ██ ███████    ██    ███████ ██   ██  ██████  ██ ██████  ███████ ██   ████ 



const asteroidring = new THREE.Object3D();

function createasteroidring() {
    const asteroidorbit = new THREE.Object3D();
    asteroidorbit.rotation.y = Array(1).fill().map(() => THREE.MathUtils.randFloat(0, 6.28318530718));

    const geometry = new THREE.SphereGeometry(0.8, 8, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x797979, emissive: 0x797979, emissiveIntensity: 0.1 })
    const asteroid = new THREE.Mesh(geometry, material);

    const x = THREE.MathUtils.randFloat(145, 158);
    const y = THREE.MathUtils.randFloatSpread(10);
    const z = THREE.MathUtils.randFloatSpread(10);


    asteroid.position.set(x, y, z);

    asteroidorbit.add(asteroid);

    asteroidring.add(asteroidorbit);

}

Array(650).fill().forEach(createasteroidring)

Visuals.add(asteroidring)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//      ██ ██    ██ ██████  ██ ████████ ███████ ██████  
//      ██ ██    ██ ██   ██ ██    ██    ██      ██   ██ 
//      ██ ██    ██ ██████  ██    ██    █████   ██████  
// ██   ██ ██    ██ ██      ██    ██    ██      ██   ██ 
//  █████   ██████  ██      ██    ██    ███████ ██   ██ 




// Definition Aller Elemente Des Jupiters //

const jup = new THREE.Object3D();
Solarsystem.add(jup);

const jupgeometry = new THREE.SphereGeometry(9, 30, 30, );
const jupTexture = new THREE.TextureLoader().load('planet_textures/2k_jup.png');
const jupmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: jupTexture });

const jupmesh = new THREE.Mesh(jupgeometry, jupmaterial);

jupmesh.position.set(190, 0, 0)

jup.add(jupmesh)

//Jupiterumlaufbahn um die Sonne
const juporbit = new THREE.TorusGeometry(190, orbitring, 20, 150);
const juporbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const juporbitring = new THREE.Mesh(juporbit, juporbitmat)
juporbitring.rotation.x = (1.5707963267948966)

Visuals.add(juporbitring)

function jupclick() {



    if (clicked) {
        requestAnimationFrame(jupclick);

        sun.visible = false
        mercmesh.visible = false
        venusmesh.visible = false
        earthmesh.visible = false
        marsmesh.visible = false

        satmesh.visible = false
        uramesh.visible = false
        nepmesh.visible = false
        satring.visible = false;

        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, jupmesh.position);
        midpoint.multiplyScalar(0.9);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(jupmesh.position);
        controls.target = jupmesh.position;

        timemod = 0.1;

    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ███████  █████  ████████ ██    ██ ██████  ███    ██ 
// ██      ██   ██    ██    ██    ██ ██   ██ ████   ██ 
// ███████ ███████    ██    ██    ██ ██████  ██ ██  ██ 
//      ██ ██   ██    ██    ██    ██ ██   ██ ██  ██ ██ 
// ███████ ██   ██    ██     ██████  ██   ██ ██   ████ 





// Definition Aller Elemente Des Saturns //

const sat = new THREE.Object3D();
Solarsystem.add(sat);

const satgeometry = new THREE.SphereGeometry(8, 30, 30, );
const satTexture = new THREE.TextureLoader().load('planet_textures/2k_sat.png');
const satmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: satTexture });

const satmesh = new THREE.Mesh(satgeometry, satmaterial);

satmesh.position.set(230, 0, 0)

Solarsystem.add(satmesh)

//Saturnringe
const satringgeometry = new THREE.RingGeometry(15, 30);

const satringTexture = new THREE.TextureLoader().load('planet_textures/2k_satringnew.png');
const satringmat = new THREE.MeshStandardMaterial({ color: 0xffff00, map: satringTexture, side: THREE.DoubleSide, emissive: 0xffffff, emissiveIntensity: 0.01, transparent: true })
const satring = new THREE.Mesh(satringgeometry, satringmat)
satring.rotation.x = (-1.1707963267948966)


sat.add(satring)


//Saturnumlaufbahn um die Sonne
const satorbit = new THREE.TorusGeometry(230, orbitring, 20, 150);
const satorbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.02 })
const satorbitring = new THREE.Mesh(satorbit, satorbitmat)
satorbitring.rotation.x = (1.5707963267948966)

Visuals.add(satorbitring)

function satclick() {



    if (clicked) {

        requestAnimationFrame(satclick);

        sun.visible = false
        mercmesh.visible = false
        venusmesh.visible = false
        earthmesh.visible = false
        marsmesh.visible = false
        jupmesh.visible = false

        uramesh.visible = false
        nepmesh.visible = false


        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, satmesh.position);
        midpoint.multiplyScalar(0.85);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);
        camera.position.y += 2

        camera.lookAt(satmesh.position);
        controls.target = satmesh.position;

        timemod = 0.1;

    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ██    ██ ██████   █████  ███    ██ ██    ██ ███████ 
// ██    ██ ██   ██ ██   ██ ████   ██ ██    ██ ██      
// ██    ██ ██████  ███████ ██ ██  ██ ██    ██ ███████ 
// ██    ██ ██   ██ ██   ██ ██  ██ ██ ██    ██      ██ 
//  ██████  ██   ██ ██   ██ ██   ████  ██████  ███████ 






// Definition Aller Elemente Des Uranus

const ura = new THREE.Object3D();
Solarsystem.add(ura);

const urageometry = new THREE.SphereGeometry(7, 20, 16, );
const uraTexture = new THREE.TextureLoader().load('planet_textures/2k_ura.png');
const uramaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: uraTexture });

const uramesh = new THREE.Mesh(urageometry, uramaterial);

uramesh.position.set(270, 0, 0)

ura.add(uramesh)

//Uranusumlaufbahn um die Sonne
const uraorbit = new THREE.TorusGeometry(270, orbitring, 20, 150);
const uraorbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const uraorbitring = new THREE.Mesh(uraorbit, uraorbitmat)
uraorbitring.rotation.x = (1.5707963267948966)

Visuals.add(uraorbitring)

function uraclick() {


    if (clicked) {

        requestAnimationFrame(uraclick);

        sun.visible = false
        mercmesh.visible = false
        venusmesh.visible = false
        earthmesh.visible = false
        marsmesh.visible = false
        jupmesh.visible = false
        satmesh.visible = false

        nepmesh.visible = false
        satring.visible = false;

        satring.visible = false;
        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, uramesh.position);
        midpoint.multiplyScalar(0.85);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(uramesh.position);
        controls.target = uramesh.position;

        timemod = 0.1;

    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ███    ██ ███████ ██████  ████████ ██    ██ ███    ██ 
// ████   ██ ██      ██   ██    ██    ██    ██ ████   ██ 
// ██ ██  ██ █████   ██████     ██    ██    ██ ██ ██  ██ 
// ██  ██ ██ ██      ██         ██    ██    ██ ██  ██ ██ 
// ██   ████ ███████ ██         ██     ██████  ██   ████ 





// Definition Aller Elemente Des Neptun

const nep = new THREE.Object3D();
Solarsystem.add(nep);

const nepgeometry = new THREE.SphereGeometry(8, 20, 16, );
const nepTexture = new THREE.TextureLoader().load('planet_textures/2k_nep.png');
const nepmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: nepTexture });

const nepmesh = new THREE.Mesh(nepgeometry, nepmaterial);

nepmesh.position.set(300, 0, 0)

nep.add(nepmesh)

//Neptunumlaufbahn um die Sonne
const neporbit = new THREE.TorusGeometry(300, orbitring, 20, 150);
const neporbitmat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.01 })
const neporbitring = new THREE.Mesh(neporbit, neporbitmat)
neporbitring.rotation.x = (1.5707963267948966)

Visuals.add(neporbitring)

function nepclick() {


    if (clicked) {

        requestAnimationFrame(nepclick);

        sun.visible = false
        mercmesh.visible = false
        venusmesh.visible = false
        earthmesh.visible = false
        marsmesh.visible = false
        jupmesh.visible = false
        satmesh.visible = false
        uramesh.visible = false

        satring.visible = false;

        Visuals.visible = false;
        sunLight.intensity = 0.4


        outline.edgeStrength = 0;

        const midpoint = new THREE.Vector3();
        midpoint.addVectors(scene.position, nepmesh.position);
        midpoint.multiplyScalar(0.9);

        // Update camera position to the midpoint
        camera.position.copy(midpoint);

        camera.lookAt(nepmesh.position);
        controls.target = nepmesh.position;

        timemod = 0.1;

    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)





//  ██████  ██████  ███    ██ ████████ ██████   ██████  ██      ███████ 
// ██      ██    ██ ████   ██    ██    ██   ██ ██    ██ ██      ██      
// ██      ██    ██ ██ ██  ██    ██    ██████  ██    ██ ██      ███████ 
// ██      ██    ██ ██  ██ ██    ██    ██   ██ ██    ██ ██           ██ 
//  ██████  ██████  ██   ████    ██    ██   ██  ██████  ███████ ███████ 








// ermöglicht die Bewegung des 3D-Modells mit der Maus
const controls = new OrbitControls(camera, renderer.domElement);



controls.minDistance = 10.2;
controls.maxDistance = 1000;
controls.enablePan = false;



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



// ██████   █████  ██    ██  ██████  █████  ███████ ████████ 
// ██   ██ ██   ██  ██  ██  ██      ██   ██ ██         ██    
// ██████  ███████   ████   ██      ███████ ███████    ██    
// ██   ██ ██   ██    ██    ██      ██   ██      ██    ██    
// ██   ██ ██   ██    ██     ██████ ██   ██ ███████    ██    


const raycaster2 = new THREE.Raycaster();
const mouse = new THREE.Vector2();






function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster2.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster2.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // If there's an intersection, execute a function
        handleClick(intersects[0].object);
    }
}

function handleClick(object) {

    if (!clicked) {


        camerahelp.position.copy(camera.position);


        if (object === sun) {
            clicked = true;
            sunclick();

        }
        if (object === mercmesh) {
            clicked = true;
            mercclick();
        }
        if (object === venusmesh) {
            clicked = true;
            venusclick();

        }
        if (object === earthmesh) {
            clicked = true;
            earthclick();

        }
        if (object === marsmesh) {
            clicked = true;
            marsclick();

        }
        if (object === jupmesh) {
            clicked = true;
            jupclick();

        }
        if (object === satmesh) {
            clicked = true;
            satclick();

        }
        if (object === uramesh) {
            clicked = true;
            uraclick();

        }
        if (object === nepmesh) {
            clicked = true;
            nepclick();

        }
    } else {
        Solarsystemclick();
        Solarsystemclick();
    }
}

window.addEventListener('click', onMouseClick, false);




// Funktion um die position des Mauszeigers abzufragen und um zu überprüfen ob der Mauszeiger auf einem Objekt liegt



// Raycasting setup
// const raycaster = new THREE.Raycaster();
// const mouse1 = new THREE.Vector2();

// function onMouseMove(event) {
//     const rect = canvas.getBoundingClientRect();

//     // Convert mouse position to normalized device coordinates (-1 to +1)
//     mouse1.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     mouse1.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//     raycaster.setFromCamera(mouse1, camera);
//     const intersects = raycaster.intersectObjects(scene.children);

//     if (intersects.length > 0) {
//         intersects[0].object.material.color.set(0xff0000);
//     } else {
//         cube.material.color.set(0x00ff00);
//     }
// }

// window.addEventListener('mousemove', onMouseMove);




const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {

    event.preventDefault();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


window.addEventListener('pointermove', onPointerMove);
window.addEventListener('resize', onWindowResize, false);
window.requestAnimationFrame(animate);



const selectedObjects = [];

function addSelectedObjects(object) {
    if (selectedObjects.length > 0) {
        selectedObjects.pop();
    }
    selectedObjects.push(object);
}



let INTERSECTED;


function intersections() {

    // aktualisiert den Hilfsstrahl zwischen der simulierten Kamera und dem Mauszeiger
    raycaster.setFromCamera(pointer, camera);

    // berechnet die Objekte die vom Hilfsstrahl getroffen werden
    const intersects = raycaster.intersectObjects(Solarsystem.children);


    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object && intersects[0].object.type === "Mesh" && intersects[0].object != satring) {



            INTERSECTED = intersects[0].object;



            addSelectedObjects(INTERSECTED);

            outline.selectedObjects = selectedObjects;

            //console.log(INTERSECTED);
            console.log(INTERSECTED.name);

        }

    } else {

        INTERSECTED = null;

    }



    // for (let i = 0; i < intersects.length; i++) {

    //     intersects[i].object.material.color.set(Math.random() * 0xffffff);

    // }

}






// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 


var timemod = 1.0;
let clicked = false;
camera.position.set(camerahelp.position.x, camerahelp.position.y, camerahelp.position.z);
const clock = new THREE.Clock();


//finale Rendering function
function animate() {

    const time = clock.getElapsedTime();



    requestAnimationFrame(animate);

    intersections()








    // Eigenrotation der Sonne
    sun.rotation.y += 0.002;


    // Rotation des Merkurs um die Sonne
    mercmesh.position.set(Math.cos(time * timemod / 1) * 40, 0, Math.sin(time * timemod / 1) * 40);

    // Eigenrotation des Merkurs
    mercmesh.rotation.y += 0.0005;



    // Rotation der Venus um die Sonne
    venusmesh.position.set(Math.cos(time * timemod / 3) * 65, 0, Math.sin(time * timemod / 3) * 65);
    // Eigenrotation der Venus
    venusmesh.rotation.y += 0.0005;





    // Rotation der Erde um die Sonne
    earthmesh.position.set(Math.cos(time * timemod / 5) * 90, 0, Math.sin(time * timemod / 5) * 90);
    // Eigenrotation der Erde
    earthmesh.rotation.y += 0.0005;

    // Rotation des Mondes um die Erde
    moonorbit.position.set(earthmesh.position.x, earthmesh.position.y, earthmesh.position.z)

    moonorbit.rotation.y += 0.002;
    // Eigenrotation des Mondes
    moon.rotation.y += 0.0005;



    // Rotation des Mars um die Sonne
    marsmesh.position.set(Math.cos(time * timemod / 10) * 120, 0, Math.sin(time * timemod / 10) * 120);
    // Eigenrotation des Mars
    marsmesh.rotation.y += 0.0005;

    // Rotation der Asteroiden um die Sonne
    asteroidring.rotation.y -= 0.00025;



    // Rotation des Jupiters um die Sonne
    jupmesh.position.set(Math.cos(time * timemod / 15) * 190, 0, Math.sin(time * timemod / 15) * 190);
    // Eigenrotation des jupiters
    jupmesh.rotation.y += 0.0005;




    // Rotation des Saturns um die Sonne
    satmesh.position.set(Math.cos(time * timemod / 20) * 230, 0, Math.sin(time * timemod / 20) * 230);
    // Eigenrotation des Saturns
    satmesh.rotation.y += 0.0005;

    sat.position.set(satmesh.position.x, satmesh.position.y, satmesh.position.z)


    // Rotation des Uranus um die Sonne
    uramesh.position.set(Math.cos(time * timemod / 25) * 270, 0, Math.sin(time * timemod / 25) * 270);
    // Eigenrotation des Uranus
    uramesh.rotation.y += 0.0005;

    // Rotation des Neptuns um die Sonne
    nepmesh.position.set(Math.cos(time * timemod / 30) * 300, 0, Math.sin(time * timemod / 30) * 300);
    // Eigenrotation des Uranus
    nepmesh.rotation.y += 0.0005;


    controls.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.render(scene, camera);
    composer.render();
}

animate()