import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import Lines from '../../../components/Molecules/Lines'
import TextColor from '../../../components/Molecules/TextColor'

export default function Fourth({ viewport, position, scrollPosition, mobile }) {
  const marriageMeshRef = useRef();
  const lineMaterialRef = useRef()
  const descriptionRef = useRef();
  const lightRef = useRef()

  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame((state) => {
    descriptionRef.current.position.x = scrollPosition.current - 2.8;
    descriptionRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 2.3))
    lightRef.current.intensity = Math.min(0.3, Math.max(0.0, 0.5 * (scrollPosition.current - 2.4)))
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.009;
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshPhongMaterial color="#000000" />
      <directionalLight color="#5124FF" ref={lightRef} intensity={0.0} position={[1.0, 0.6, 2]} />
      <TextColor ref={descriptionRef} position={[0, mobile ? 0.8 : 0.3, 0.1]} text="My work as a developer is more a passion I fall into when I was 10 year old. I master many libraries and frameworks such as React, Vue, WordPress, Node. I work for multiple companies and try to push myself everyday by experimenting on my personal projects which can be found on my github." />
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( viewport.width, viewport.height / 2, 0.0),
        new THREE.Vector3( 2, viewport.height, 0.0),
        new THREE.Vector3( 0.5, 0.2 * viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( -0.5, - 1.2 * viewport.height / 2 + 0.8, 0.0),
        new THREE.Vector3( -viewport.width, - viewport.height / 2, 0.0)
      ]}/>
      <ImageDisplacement ref={marriageMeshRef} args={[mobile ? 1.2 : 0.8, mobile ? 1.2 : 0.8, 32]} position={[mobile ? -0.2 : -0.5, mobile ? -1.0 : -0.6, 0.6]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
    </mesh>
  )
}
