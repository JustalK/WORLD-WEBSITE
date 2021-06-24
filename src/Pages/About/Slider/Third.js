import React, { useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text";
import Lines from '../../../components/Molecules/Lines'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import * as THREE from 'three'
extend({ Text });

export default function Third({ viewport, position, scrollPosition }) {
  const descriptionRef = useRef()
  const lineMaterialRef = useRef()

  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame(() => {
    descriptionRef.current.position.x = 1.8 - scrollPosition.current;
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.007;
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshPhongMaterial color="#000000" />
      <text
        position={[0, 0.3, 0.1]}
        fontSize={0.05}
        color= "#ffffff"
        maxWidth={1.8}
        text={"I'm a french developer with more than 5 years of internationnal experiences. Through the year, I have worked with many frameworks such as React, Vue.js, Three.js, Node.js. On my spare time, I improve my skill by developing new websites or app, freelancing or experimenting on github."}
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
        new THREE.Vector3( -1.0, - viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( 0.2, - viewport.height / 2, 0.0)
      ]}/>
      <ImageDisplacement args={[0.8, 0.8, 32]} position={[0.5, -0.6, 0.6]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/6.jpg'} />
    </mesh>
  )
}
