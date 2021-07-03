import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import '../../../shaders/BackgroundFireMaterial'
import '../../../shaders/TextShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const backgroundRef = useRef()

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundFireMaterial ref={backgroundRef} />
    </mesh>
  )
}
