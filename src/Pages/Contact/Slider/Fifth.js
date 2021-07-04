import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import TitleColor from '../../../components/Molecules/TitleColor'
import '../../../shaders/BackgroundFireUpMaterial'
import '../../../shaders/TextShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const backgroundRef = useRef()
  const titleRef = useRef()

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
    titleRef.current.fillOpacity = Math.min(1.0, 4 * (scrollPosition.current - 3.0))
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundFireUpMaterial ref={backgroundRef} />
      <TitleColor ref={titleRef} position={[0.0, 0.0, 0.1]} text="HOPE TO HEAR FROM YOU" />
    </mesh>
  )
}
