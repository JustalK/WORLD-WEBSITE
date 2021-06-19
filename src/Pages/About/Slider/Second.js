import React, { useRef, useEffect, Suspense } from 'react'
import { Html } from '@react-three/drei'

import { extend } from '@react-three/fiber'
import { Text, preloadFont } from "troika-three-text";
extend({ Text });

export default function Second({ text, color, viewport, position }) {
  const ref = useRef()
  const ref2 = useRef()

  useEffect(() => {
    console.log(ref2.current.sync())
  })

  return (
    <mesh position={position} onPointerMove={(e) => {
      ref.current.uMouse = e.intersections[0].uv
    }}>
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshBasicMaterial ref={ref} color='#000000' />
      <Html position={[0, 0, 1.1]} className="label" center>
        {text}
      </Html>
      <text
        position={[0, 0.5, 0.001]}
        fontSize={0.5}
        color= "#ffffff"
        maxWidth={100}
        text={"about me"}
        anchorX="center"
        anchorY="middle"
        ref={ref2}
      >
        <meshBasicMaterial color="#000fff" />
      </text>
    </mesh>
  )
}
