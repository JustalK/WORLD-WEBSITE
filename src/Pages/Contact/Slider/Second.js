import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import * as THREE from 'three'
import Lines from '../../../components/Molecules/Lines'
import TitleColor from '../../../components/Molecules/TitleColor'
import TextColor from '../../../components/Molecules/TextColor'
import '../../../shaders/BackgroundCustomColorShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const titleRef = useRef()
  const descriptionRef = useRef()
  const emailRef = useRef()
  const numberRef = useRef()
  const githubRef = useRef()
  const lineMaterialRef = useRef()

  useEffect(() => {
    titleRef.current.sync()
    descriptionRef.current.sync()
    emailRef.current.sync()
    numberRef.current.sync()
    githubRef.current.sync()
  })

  useFrame((state, delta) => {
    lineMaterialRef.current.uTime += delta
    descriptionRef.current.fillOpacity = Math.min(1.0, 1.5 * (scrollPosition.current - 0.6))
    emailRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 0.7))
    numberRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 0.7))
    githubRef.current.fillOpacity = Math.min(1.0, 2 * (scrollPosition.current - 0.85))
    emailRef.current.position.x = Math.min(0.0, 1.2 * scrollPosition.current - 1.2);
    numberRef.current.position.x =  - Math.min(0.0, 1.2 * scrollPosition.current - 1.2);
    githubRef.current.position.y =  Math.min(-0.75, 1.1 * scrollPosition.current - 2.0);
    titleRef.current.position.y = Math.min(0.5, scrollPosition.current - 0.2);
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <backgroundCustomColorShaderMaterial uColorRed={0.0} uColorGreen={0.0} uColorBlue={0.0}/>
      <TitleColor ref={titleRef} position={[0, 0.5, 0.1]} text="SOCIALS" />
      <TextColor ref={descriptionRef} position={[0, 0.1, 0.0]} text="You can contact me anytime by email or on my number. You will receive an answer from me in the next 48h. If it's not the case, you could also try to reach me on LinkedIn, directly on my personnal FB or use the form below." />
      <TextColor ref={emailRef} position={[0, -0.25, 0.0]} text="justal.kevin@gmail.com" />
      <TextColor ref={numberRef} position={[0, -0.5, 0.0]} text="+9996569480" />
      <TextColor ref={githubRef} position={[0, -0.75, 0.0]} text="Github: @justalk" />
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( -viewport.width, - 1.5 * viewport.height, 1),
        new THREE.Vector3( -2.0, - 1.5 * viewport.height, 1),
        new THREE.Vector3( -1.5, -0.2, 1),
        new THREE.Vector3( 1.0, viewport.height/2, 1),
        new THREE.Vector3( 1.0, 2 * viewport.height, 1),
      ]}/>
    </mesh>
  )
}
