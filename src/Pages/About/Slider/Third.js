import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import TextColor from '../../../components/Molecules/TextColor'
import Lines from '../../../components/Molecules/Lines'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import * as THREE from 'three'

export default function Third({ viewport, position, scrollPosition, mobile }) {
  const descriptionRef = useRef()
  const lineMaterialRef = useRef()
  const lightRef = useRef()
  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame((state, delta) => {
    descriptionRef.current.position.x = 1.8 - scrollPosition.current;
    descriptionRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 1.3))
    lightRef.current.intensity = Math.min(0.3, Math.max(0.0, 0.5 * (scrollPosition.current - 1.4)))
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.007;
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshPhongMaterial color="#000000" />
      <directionalLight color="#E1698B" ref={lightRef} intensity={0.0} position={[-1.0, 0.6, 2]} />
      <TextColor ref={descriptionRef} position={[0, mobile ? 0.8 : 0.3, 0.1]} text="I also love sport. I was a profesionnal roller speed skater for few years, I did several races in Europe and ended up winning a certain amount of races including some internationnal ones. Sport made me love competition. That's maybe why I like to challenge myself so much both in my professional and personnal life." />
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( -viewport.width, 2 * viewport.height / 2, 0.0),
        new THREE.Vector3( -1.5, viewport.height / 2, 0.0),
        new THREE.Vector3( -0.5, - 0.5 * viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( -0.8, - viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( 0.2, - 0.65 * viewport.height / 2, 0.0)
      ]}/>
      <ImageDisplacement args={[mobile ? 1.2 : 0.8, mobile ? 1.2 : 0.8, 32]} position={[mobile ? 0.2 : 0.5, mobile ? -0.9 : -0.6, 0.6]} pathTexture1={'./images/roller_2.jpg'} pathTexture2={'./images/roller_1.jpg'} pathTextureDisplacement={'./displacement/4.png'}  />
    </mesh>
  )
}
