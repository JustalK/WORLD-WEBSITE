import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import Cursor from '../../components/Molecules/Cursor'
import '../../shaders/ImageCustomNoiseMaterial'

export default function Scene({ cursorPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  const backgroundRef = useRef()
  const scrollPosition = useRef(0)

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
  })

  return (
    <mesh position={[0, 0, 0]} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <imageCustomNoiseMaterial ref={backgroundRef} />
      <Cursor scrollPosition={scrollPosition} cursorPosition={cursorPosition} realCursor={cursorPosition}/>
    </mesh>
  )
}
