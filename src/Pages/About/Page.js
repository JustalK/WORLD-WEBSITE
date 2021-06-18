import React, { useRef } from 'react'
import { Html } from '@react-three/drei'

export default function Box({ text, color, ...props }) {
  const ref = useRef()
  return (
    <mesh {...props} onPointerMove={(e) => {
      ref.current.uMouse = e.intersections[0].uv
    }}>
      <planeGeometry args={[1, 1, 1]} />
      <meshPhongMaterial ref={ref} color={color} />
      <Html position={[0, 0, 1.1]} className="label" center>
        {text}
      </Html>
    </mesh>
  )
}
