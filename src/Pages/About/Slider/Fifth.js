import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import TextColor from '../../../components/Molecules/TextColor'
import '../../../shaders/ImageHeartMaterial'
import Lines from '../../../components/Molecules/Lines'

export default function Fifth({ viewport, position, scrollPosition }) {
  const lineMaterialRef = useRef()
  const descriptionRef = useRef()
  const lightRef = useRef()

  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame((state, delta) => {
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.009;
    lightRef.current.intensity = Math.min(0.3, 0.5 * (scrollPosition.current - 3.4))
    descriptionRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 3.3))
  })

  return (
    <mesh position={position}>
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshPhongMaterial color="#000000" />
      <directionalLight color="#E1698B" ref={lightRef} intensity={0.0} position={[0.0, 0.6, 2]} />
      <TextColor ref={descriptionRef} position={[0, 0.5, 0.1]} text="While I was working in the Philippines, I met a women at a StarBucks who become my wife on my birthday 2021. She has been my support since I met her, I will have not make it that far without her. She also did the incredible thing to make me a father." />
      <ImageDisplacement args={[0.8, 0.8, 32]} position={[0.2, -0.2, 0.8]} pathTexture1={'./images/love_1.jpg'} pathTexture2={'./images/love_2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
      <ImageDisplacement args={[0.3, 0.3, 32]} position={[-0.4, -0.3, 1.2]} pathTexture1={'./images/love_3.jpg'} pathTexture2={'./images/love_4.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( - 0.8, 1.4 * viewport.height / 2, 0.0),
        new THREE.Vector3( 0.8, viewport.height / 2, 0.0),
        new THREE.Vector3( 0.0, 0.0, 0.0),
        new THREE.Vector3( -0.75, - 0.4 * viewport.height / 2, 0.0),
        new THREE.Vector3( -1.2, - viewport.height / 2, 0.0),
      ]}/>
    </mesh>
  )
}
