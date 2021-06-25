import React, { useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text";
import * as THREE from 'three'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import '../../../shaders/ImageNoiseMaterial'
import Lines from '../../../components/Molecules/Lines'
extend({ Text });

export default function Second({ scrollPosition, viewport, position }) {
  const titleRef = useRef()
  const descriptionRef = useRef()
  const backgroundRef = useRef()
  const lineMaterialRef = useRef()

  useEffect(() => {
    titleRef.current.sync()
    descriptionRef.current.sync()
  })

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.005;
    descriptionRef.current.position.y = Math.min(0.0, scrollPosition.current - 1.0);
    titleRef.current.position.y = Math.min(0.5, scrollPosition.current - 0.2);
  })

  return (
    <>
      <mesh position={position} >
        <planeGeometry args={[viewport.width, viewport.height, 1]} />
        <imageNoiseMaterial ref={backgroundRef} />
        <text
          position={[0, 0.5, 0.1]}
          fontSize={0.2}
          color= "#ffffff"
          maxWidth={100}
          text={"ABOUT ME"}
          anchorX="center"
          anchorY="middle"
          ref={titleRef}
        >
          <meshBasicMaterial color="#000fff" />
        </text>
        <text
          position={[0, 0.0, 0.1]}
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
        <ImageDisplacement args={[0.5, 0.5, 32]} position={[-0.2, -0.5, 1.1]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
        <ImageDisplacement args={[0.5, 0.5, 32]} position={[0.4, -0.8, 0.7]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
        <Lines ref={lineMaterialRef} pointsPosition={[
          new THREE.Vector3( viewport.width, 3 * viewport.height / 2, 0),
          new THREE.Vector3( 1.5, viewport.height / 2, 0),
          new THREE.Vector3( 1.0, - viewport.height / 2 + 0.8, 0),
          new THREE.Vector3( 0, - viewport.height / 2 + 0.4, 0),
          new THREE.Vector3( -0.4, - viewport.height / 2, 0)
        ]}/>
      </mesh>
    </>
  )
}
