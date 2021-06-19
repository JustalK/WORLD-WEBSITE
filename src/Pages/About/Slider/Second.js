import React, { useRef } from 'react'
import { Html } from '@react-three/drei'

export default function Second({ text, color, viewport, position }) {
  const ref = useRef()
  return (
    <mesh position={position} onPointerMove={(e) => {
      ref.current.uMouse = e.intersections[0].uv
    }}>
      <planeGeometry args={[10, 1, 1]} />
      <meshPhongMaterial ref={ref} color='#000000' />
      <Html position={[0, 0, 1.1]} className="label" center>
        {text}
      </Html>
    </mesh>
  )
}
