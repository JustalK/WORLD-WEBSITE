import React, { useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text";
import Lines from '../../../components/Molecules/Lines'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import '../../../shaders/ImageNoiseMaterial'
import * as THREE from 'three'
extend({ Text });

export default function Third({ viewport, position, scrollPosition }) {
  const descriptionRef = useRef()
  const lineMaterialRef = useRef()
  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame((state, delta) => {
    descriptionRef.current.position.x = 1.8 - scrollPosition.current;
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.007;
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshBasicMaterial color="#000000" />
      <text
        position={[0, 0.3, 0.1]}
        fontSize={0.05}
        color= "#ffffff"
        maxWidth={1.8}
        text={"I also love sport. I was a profesionnal roller speed skater for few years, I did several races in Europe and ended up winning a certain amount of races including some internationnal ones. Sport made me love competition. That's maybe why I like to challenge myself so much both in my professional and personnal life."}
        anchorX="center"
        anchorY="middle"
        ref={descriptionRef}
      >
        <meshBasicMaterial color="#000fff" />
      </text>
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( -viewport.width, 2 * viewport.height / 2, 0.0),
        new THREE.Vector3( -1.5, viewport.height / 2, 0.0),
        new THREE.Vector3( -0.5, - 0.5 * viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( -0.8, - viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( 0.2, - 0.65 * viewport.height / 2, 0.0)
      ]}/>
      <ImageDisplacement args={[0.8, 0.8, 32]} position={[0.5, -0.6, 0.6]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'}  />
    </mesh>
  )
}
