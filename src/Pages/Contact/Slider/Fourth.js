import React, { useEffect, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import TitleColor from '../../../components/Molecules/TitleColor'
import { Text } from "troika-three-text";
import '../../../shaders/BackgroundCustomColorShaderMaterial'
import { Html } from '@react-three/drei'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const titleRef = useRef()

  useEffect(() => {
    titleRef.current.sync()
  })

  useFrame((state, delta) => {
    titleRef.current.position.y = Math.min(0.9, scrollPosition.current - 0.2);
  })

  return (
    <>
      <mesh position={position} >
        <planeGeometry args={[viewport.width, viewport.height, 1]} />
        <backgroundCustomColorShaderMaterial uColorRed={0.356} uColorGreen={0.035} uColorBlue={0.978}/>
        <TitleColor ref={titleRef} position={[0, -0.4, 0.1]} text="GET IN TOUCH" />
        <Html distanceFactor={0.8} transform position={[0, 0.1, 0]} style={{width: '600px'}} center >
          <div>
            <input className="customInput" placeholder="Write your email : me@example.com" />
          </div>
          <div>
            <textarea className="customTextarea" placeholder="Write your question or concern..." />
          </div>
        </Html>
      </mesh>
    </>
  )
}
