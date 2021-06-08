import React from 'react'
import Image from './Image'
import Cursor from './Cursor'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from "three"

export default function Scene({ cursorPosition }) {
  const viewport = useThree((state) => state.viewport)

  return (
    <>
      <Html position={[0, 0.6 * viewport.height / 2, 0]} style={{'pointer-events': 'none', width: '100vw'}} center >
        <h1>Any Variation<br />is another world</h1>
      </Html>
      <Cursor cursorPosition={cursorPosition} />
      <Image position={[0, - 0.2 * viewport.height / 2, 0.0001]} />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>
    </>
  )
}
