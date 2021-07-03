import React from 'react'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import '../../../shaders/BackgroundCustomColorShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundCustomColorShaderMaterial uColorRed={0.0} uColorGreen={0.0} uColorBlue={0.0}/>
    </mesh>
  )
}
