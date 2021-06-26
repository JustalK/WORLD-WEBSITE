import React, { useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import { Text } from "troika-three-text"
import '../../../shaders/ImageNoiseMaterial'
extend({Text})

export default function Sixth({ viewport, position, scrollPosition }) {
  const titleRef = useRef()
  const backgroundRef = useRef()

  useEffect(() => {
    titleRef.current.sync()
  })

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
    titleRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 3.3))
  })

  return (
    <mesh position={position}>
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <imageNoiseMaterial ref={backgroundRef} />
      <text
        position={[0, 0.0, 0.1]}
        fontSize={0.2}
        color= "#ffffff"
        maxWidth={100}
        text={"TO BE CONTINUE"}
        anchorX="center"
        anchorY="middle"
        ref={titleRef}
      >
        <meshBasicMaterial color="#000fff" />
      </text>
    </mesh>
  )
}
