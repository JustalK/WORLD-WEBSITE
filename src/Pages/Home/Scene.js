import React from 'react'
import Image from './Image'
import Cursor from './Cursor'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function Scene({ cursorPosition }) {
  const viewport = useThree((state) => state.viewport)

  return (
    <>
        <mesh position={[0, 0.8 * viewport.height / 2, 0]}>
          <Html style={{'pointer-events': 'none', width: '100vw'}} center >
            <h1>JUSTAL KEVIN</h1>
          </Html>
        </mesh>
      <Cursor cursorPosition={cursorPosition} />
      <Image position={[0, - 0.25 * viewport.height / 2, 0]} />
    </>
  )
}
