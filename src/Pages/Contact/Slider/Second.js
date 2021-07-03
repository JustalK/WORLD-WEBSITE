import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import TitleColor from '../../../components/Molecules/TitleColor'
import TextColor from '../../../components/Molecules/TextColor'
import '../../../shaders/BackgroundCustomColorShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const titleRef = useRef()
  const emailRef = useRef()
  const numberRef = useRef()

  useEffect(() => {
    titleRef.current.sync()
    emailRef.current.sync()
    numberRef.current.sync()
  })

  useFrame((state, delta) => {
    emailRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 0.5))
    numberRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 0.5))
    emailRef.current.position.y = Math.min(0.2, scrollPosition.current - 0.7);
    numberRef.current.position.y = Math.min(0.0, scrollPosition.current - 1.0);
    titleRef.current.position.y = Math.min(0.5, scrollPosition.current - 0.2);
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundCustomColorShaderMaterial uColorRed={0.0} uColorGreen={0.0} uColorBlue={0.0}/>
      <TitleColor ref={titleRef} position={[0, 0.5, 0.1]} text="SOCIALS" />
      <TextColor ref={emailRef} position={[0, 0, 0.0]} text="justal.kevin@gmail.com" />
      <TextColor ref={numberRef} position={[0, 0, 0.0]} text="+9996569480" />
    </mesh>
  )
}
