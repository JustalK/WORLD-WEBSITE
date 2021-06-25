import React, { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text"
import { TweenMax as TM } from 'gsap'
import '../../../shaders/ImageNoiseMaterial'
extend({ Text });

export default function Fourth({ viewport, position, scrollPosition }) {
  const marriageMeshRef = useRef();

  useFrame((state) => {
    TM.to(marriageMeshRef.current.position, 0.15, {
      y: Math.max(Math.min(0,0, 2.0 * (3.0 - scrollPosition.current)), -3.0)
    })
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshBasicMaterial color="#000000" />
      <mesh ref={marriageMeshRef} position={[0, 0, 0]} >
        <planeGeometry args={[1, 1, 32]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>
    </mesh>
  )
}
