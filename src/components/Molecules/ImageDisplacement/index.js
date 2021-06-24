import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three"
import { TweenMax as TM } from 'gsap'
import '../../../shaders/ImageDisplacementMaterial'

export default function ImageDisplacement({ args, position, pathTexture1, pathTexture2, pathTextureDisplacement }) {
  const ref = useRef()
  const [uTexture1, uTexture2, uTextureDisplacement] = useLoader(THREE.TextureLoader, [pathTexture1, pathTexture2, pathTextureDisplacement])

  useFrame((state, delta) => {
    ref.current.uTime += delta
  })

  return (
    <mesh position={position} onPointerEnter={() => {
        TM.to(ref.current.uniforms.uTextureDisplacementFactor, 1.6, { value: 1, ease: 'expo.out'})
        TM.to(ref.current.uniforms.uVelo, 1.0, { value: 1, ease: 'expo.out'})
      }}
      onPointerOut={() => {
        TM.to(ref.current.uniforms.uTextureDisplacementFactor, 1.6, { value: 0, ease: 'expo.out'})
        TM.to(ref.current.uniforms.uVelo, 1.0, { value: 0, ease: 'expo.out'})
      }}>
      <planeGeometry args={args} />
      <imageDisplacementMaterial ref={ref} uTexture1={uTexture1} uTexture2={uTexture2} uTextureDisplacement={uTextureDisplacement} />
    </mesh>
  )
}
