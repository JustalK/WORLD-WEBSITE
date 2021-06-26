import React, { useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import ImageDisplacement from '../../../components/Molecules/ImageDisplacement'
import { Text } from "troika-three-text"
import '../../../shaders/ImageHeartMaterial'
extend({Text})

export default function Fifth({ viewport, position, scrollPosition }) {
  const heartMaterialRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame((state, delta) => {
    heartMaterialRef.current.uTime += delta
    descriptionRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 3.3))
  })

  return (
    <mesh position={position}>
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <imageHeartMaterial ref={heartMaterialRef} color="#00ff00" />
      <text
        position={[0, 0.5, 0.1]}
        fontSize={0.05}
        color= "#ffffff"
        maxWidth={1.8}
        text={"While I was working in the Philippines, I met a women at a StarBucks who become my wife on my birthday 2021. She has been my support since I met her, I will have not make it that far without her. She also did the incredible thing to make me a father."}
        anchorX="center"
        anchorY="middle"
        ref={descriptionRef}
      >
        <meshBasicMaterial color="#000fff" />
      </text>
      <ImageDisplacement args={[0.8, 0.8, 32]} position={[0.2, -0.2, 0.8]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
      <ImageDisplacement args={[0.3, 0.3, 32]} position={[-0.4, -0.3, 1.2]} pathTexture1={'./1.jpeg'} pathTexture2={'./2.jpg'} pathTextureDisplacement={'./displacement/4.png'} />
    </mesh>
  )
}
