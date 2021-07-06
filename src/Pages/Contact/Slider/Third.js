import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import * as THREE from 'three'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/BackgroundFireMaterial'
import '../../../shaders/TextShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const backgroundRef = useRef()
  const lineMaterialRef = useRef()

  useFrame((state, delta) => {
    lineMaterialRef.current.uTime += delta
    backgroundRef.current.uTime += delta
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundFireMaterial ref={backgroundRef} />
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( viewport.width, -viewport.height, 0),
        new THREE.Vector3( 1.0, 0.1, 0),
        new THREE.Vector3( 0.2, -0.2, 0),
        new THREE.Vector3( -viewport.width, viewport.height/2, 0),
      ]}/>
    </mesh>
  )
}
