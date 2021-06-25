import React, { useRef, forwardRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three"
import { TweenMax as TM } from 'gsap'
import '../../../shaders/ImageDisplacementScrollMaterial'

const ImageDisplacementScroll = forwardRef(({args, position, scrollPosition, pathTexture1, pathTexture2, pathTextureDisplacement }, meshRef) => {
  const ref = useRef()
  const [uTexture1, uTexture2, uTextureDisplacement] = useLoader(THREE.TextureLoader, [pathTexture1, pathTexture2, pathTextureDisplacement])

  useFrame((state, delta) => {
    ref.current.uTime += delta
    TM.to(ref.current.uniforms.uTextureDisplacementFactor, 0.15, {
      value: Math.max(Math.min(3.5 * (scrollPosition.current - 2.8), 1.0), 0.0),
      ease: 'expo.out'
    })
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={args} />
      <imageDisplacementScrollMaterial ref={ref} uTexture1={uTexture1} uTexture2={uTexture2} uTextureDisplacement={uTextureDisplacement} />
    </mesh>
  )
})

export default ImageDisplacementScroll;
