import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import Lines from '../../../components/Molecules/Lines'
import TitleColor from '../../../components/Molecules/TitleColor'
import TextColor from '../../../components/Molecules/TextColor'
import '../../../shaders/ImageNoiseMaterial'

export default function Second({ scrollPosition, viewport, position, mobile }) {
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
    descriptionRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 0.5))
    descriptionRef.current.position.y = Math.min(mobile ? 0.5 : 0.0, scrollPosition.current - 1.0);
    titleRef.current.position.y = Math.min(mobile ? 1.0 : 0.5, mobile ? 1.2 * scrollPosition.current : scrollPosition.current - 0.2);
  })

  return (
    <>
      <mesh position={position} >
        <planeGeometry args={[viewport.width, viewport.height, 1]} />
        <imageNoiseMaterial ref={backgroundRef} />
        <TitleColor ref={titleRef} position={[0,  0.5, 0.1]} text="MY LIFE" />
        <TextColor ref={descriptionRef} position={[0, 0, 0.1]} text="Hello, I'm Kevin, 30, a developer from Rennes, a city from Britany in France. As a child, My parents made me discover the Europe. As a natural consequence, I turn to love travelling, I move from France in my twenties and I started to work at the opposite of the world for multiple years." />
        <ImageDisplacement args={[mobile ? 0.6 : 0.5, mobile ? 0.6 : 0.5, 32]} position={[mobile ? -0.4 : -0.2,  mobile ? -0.8 : -0.5, 1.1]} pathTexture1={'./images/work_4.jpg'} pathTexture2={'./images/work_2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
        <ImageDisplacement args={[mobile ? 0.8 : 0.5, mobile ? 0.8 : 0.5, 32]} position={[0.4, mobile ? -1.0 : -0.8, 0.7]} pathTexture1={'./images/work_5.jpg'} pathTexture2={'./images/work_3.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
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
