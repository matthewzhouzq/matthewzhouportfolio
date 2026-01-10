import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const GRID_SIZE = 150
const SPACING = 1

// Mouse peak
const PEAK_HEIGHT = 6
const SPREAD = 0.75

// Bubbling base
const BUBBLE_HEIGHT = 0.2
const BUBBLE_SPEED = 2.5

const LOW_COLOR = new THREE.Color('#232F3E')
const HIGH_COLOR = new THREE.Color('#FEBD69')

export default function CubeField() {
  const group = useRef()
  const { mouse, camera } = useThree()

  const raycaster = useRef(new THREE.Raycaster())
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))
  const hitPoint = useRef(new THREE.Vector3())

  const cubes = useMemo(() => {
    const arr = []
    for (let x = -GRID_SIZE / 2; x < GRID_SIZE / 2; x++) {
      for (let z = -GRID_SIZE / 2; z < GRID_SIZE / 2; z++) {
        arr.push({
          position: new THREE.Vector3(x * SPACING, 0, z * SPACING),
          height: 0,
          noiseOffset: Math.random() * Math.PI * 2
        })
      }
    }
    return arr
  }, [])

    useFrame((state) => {
    const time = state.clock.elapsedTime

    let mx = 9999
    let mz = 9999

    if (!window.__UI_HOVERING__) {
        raycaster.current.setFromCamera(mouse, camera)
        raycaster.current.ray.intersectPlane(plane.current, hitPoint.current)

        mx = hitPoint.current.x
        mz = hitPoint.current.z
    }

    cubes.forEach((cube, i) => {
        const mesh = group.current.children[i]

        const bubble =
        (Math.sin(time * BUBBLE_SPEED + cube.noiseOffset) +
            Math.sin(time * BUBBLE_SPEED * 0.7 + cube.position.x * 0.3) +
            Math.sin(time * BUBBLE_SPEED * 0.9 + cube.position.z * 0.3)) * 0.33

        const bubbleHeight = Math.max(bubble * BUBBLE_HEIGHT, 0)

        const dx = cube.position.x - mx
        const dz = cube.position.z - mz
        const distSq = dx * dx + dz * dz

        const mouseHeight =
        Math.exp(-distSq / (2 * SPREAD * SPREAD)) * PEAK_HEIGHT

        const desiredHeight = bubbleHeight + mouseHeight

        cube.height = THREE.MathUtils.lerp(cube.height, desiredHeight, 0.12)

        const height = Math.max(cube.height, 0.001)
        mesh.scale.y = height
        mesh.position.y = height / 2

        const t = THREE.MathUtils.clamp(height / PEAK_HEIGHT, 0, 1)
        mesh.material.color.lerpColors(LOW_COLOR, HIGH_COLOR, t)
    })
    })

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#232F3E" />
        </mesh>
      ))}
    </group>
  )
}
