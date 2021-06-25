import React, { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text"
import * as THREE from 'three'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/ImageNoiseMaterial'
extend({ Text });

export default function Fourth({ viewport, position, scrollPosition }) {
  const marriageMeshRef = useRef();
  const lineMaterialRef = useRef()

  useFrame((state) => {
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshBasicMaterial color="#000000" />
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( -viewport.width, 2 * viewport.height / 2, 0.0),
        new THREE.Vector3( -1.5, viewport.height / 2, 0.0),
        new THREE.Vector3( -0.5, - 0.5 * viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( -0.8, - viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( 0.2, - 0.65 * viewport.height / 2, 0.0)
      ]}/>
      <ImageDisplacement ref={marriageMeshRef} args={[0.8, 0.8, 32]} position={[-0.5, -0.6, 0.6]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
    </mesh>
  )
}
