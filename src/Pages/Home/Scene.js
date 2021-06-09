import React, { useRef } from 'react'
import Image from './Image'
import Cursor from './Cursor'
import { useThree, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { TweenMax as TM } from 'gsap'
import './shaders/BackgroundShaderMaterial'

export default function Scene({ cursorPosition }) {
  const viewport = useThree((state) => state.viewport)
  const material = useRef()

  useFrame((state, delta) => {
    material.current.uTime += delta
  })

  return (
    <>
      <Html position={[0, 0.6 * viewport.height / 2, 0]} style={{'pointer-events': 'none', width: '100vw'}} center >
        <h1>Any Variation<br />is another world</h1>
      </Html>
      <Cursor cursorPosition={cursorPosition} />
      <Image position={[0, - 0.2 * viewport.height / 2, 0.0001]} />
      <mesh position={[0, 0, 0]}onPointerMove={(e) => {
          TM.to(material.current.uMouse, 0.5, {
            x: e.intersections[0].uv.x,
            y: e.intersections[0].uv.y
          })
        }}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <backgroundShaderMaterial ref={material} />
      </mesh>
    </>
  )
}
