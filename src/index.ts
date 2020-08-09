import * as THREE from 'three'

let screenWidth = window.innerWidth
let screenHeight = window.innerHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(25, screenWidth / screenHeight, 50, 1e3)
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(screenWidth, screenHeight)

document.body.appendChild(renderer.domElement)

// stars
let starsGeometry = [new THREE.BufferGeometry(), new THREE.BufferGeometry()]
let vertices1 = []
let vertices2 = []
let vertex = new THREE.Vector3()
let i

for (i = 0; i < 250; i++) {
    vertex.x = Math.random() * 2 - 1
    vertex.y = Math.random() * 2 - 1
    vertex.z = Math.random() * 2 - 1
    vertices1.push(vertex.x, vertex.y, vertex.z)
}

for (i = 0; i < 1500; i++) {
    vertex.x = Math.random() * 2 - 1
    vertex.y = Math.random() * 2 - 1
    vertex.z = Math.random() * 2 - 1
    vertices2.push(vertex.x, vertex.y, vertex.z)
}

starsGeometry[0].setAttribute('position', new THREE.Float32BufferAttribute(vertices1, 3))
starsGeometry[1].setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3))

function makeStarsMaterial(colors, sizes) {
    let material = []

    colors.forEach(color => {
        sizes.forEach(size => {
            material.push(new THREE.PointsMaterial({ color: color, size: size, sizeAttenuation: false }))
        })
    })

    return material
}

let stars
let starsmaterial = makeStarsMaterial(
    [0xffffff, 0x555555, 0x333333, 0x3a3a3a, 0x1a1a1a],
    [3, 2, 1]
)

function animateHandle(stars) {
    const speed = Math.random() * 0.0008
    const animate = () => {
        requestAnimationFrame(animate)
        stars.rotation.x += speed
        stars.updateMatrix()
        renderer.render(scene, camera)
    }
    animate()
}

for (i = 10; i < 30; i++) {
    stars = new THREE.Points(starsGeometry[i % 2], starsmaterial[i % 12])
    stars.rotation.x = Math.random() * 9
    stars.rotation.y = Math.random() * 9
    stars.rotation.z = Math.random() * 9
    stars.scale.setScalar(i * 10)
    stars.matrixAutoUpdate = false
    stars.updateMatrix()
    scene.add(stars)
    animateHandle(stars)
}

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
    camera.aspect = screenWidth / screenHeight
    camera.updateProjectionMatrix()
    renderer.setSize(screenWidth, screenHeight)
})