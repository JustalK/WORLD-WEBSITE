import React from 'react'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import '../../../shaders/BackgroundCustomColorShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundCustomColorShaderMaterial uColorRed={0.356} uColorGreen={0.035} uColorBlue={0.978}/>
    </mesh>
  )
}
