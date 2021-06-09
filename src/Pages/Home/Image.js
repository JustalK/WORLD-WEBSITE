import React, { useRef, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three"
import { TweenMax as TM } from 'gsap'
import './shaders/ImageShaderWhiteMaterial'

export default function Image({ position }) {
  const ref = useRef()
  const mesh = useRef()
  const [hover, setHover] = useState(false)
  const [tDiffuse] = useLoader(THREE.TextureLoader, ['./1.jpeg'])

  useFrame((state, delta) => {
    ref.current.uTime += delta
    ref.current.uVelo = hover ? Math.min(1.0, ref.current.uVelo + 0.05) : Math.max(0.0, ref.current.uVelo - 0.05)
  })

  return (
    <>
      <mesh ref={mesh} rotation={[0, 0, 0.05]} onPointerEnter={(e) => setHover(true)} onPointerLeave={(e) => setHover(false)} position={position} onPointerMove={(e) => {
        TM.to(ref.current.uMouse, 0.3, {
          x: e.intersections[0].uv.x,
          y: e.intersections[0].uv.y
        })
      }}>
        <planeGeometry args={[0.95, 1.2, 32, 32]} />
        <imageShaderWhiteMaterial ref={ref} tDiffuse={tDiffuse} />
      </mesh>
      <mesh rotation={[0, 0, -0.05]} position={[position[0], position[1], position[2]-0.00005]}>
        <planeGeometry args={[0.95, 1.2, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </>
  )
}
