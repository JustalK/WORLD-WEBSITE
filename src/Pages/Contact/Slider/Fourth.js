import React, { useEffect, useRef, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import TitleColor from '../../../components/Molecules/TitleColor'
import { Text } from "troika-three-text";
import * as THREE from 'three'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/BackgroundCustomColorShaderMaterial'
import '../../../shaders/ButtonShaderMaterial'
import { Html } from '@react-three/drei'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const titleRef = useRef()
  const buttonTextRef = useRef()
  const buttonRef = useRef()
  const formRef = useRef()
  const buttonMaterialRef = useRef()
  const lineMaterialRef = useRef()
  const [hover, setHover] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    titleRef.current.sync()
    buttonTextRef.current.sync()
  })

  useFrame((state, delta) => {
    lineMaterialRef.current.uTime += delta
    buttonMaterialRef.current.uTime += delta
    buttonMaterialRef.current.uHover = hover ? Math.min(1.0, buttonMaterialRef.current.uHover + 0.05) : Math.max(0.0, buttonMaterialRef.current.uHover - 0.05)
    titleRef.current.position.y = Math.min(0.9, 1.1 * scrollPosition.current - 1.2);
    formRef.current.style.opacity = Math.min(1.0, 2 * (scrollPosition.current - 1.75))
  })

  return (
    <>
      <mesh position={position} >
        <planeGeometry args={[viewport.width, viewport.height, 1]} />
        <backgroundCustomColorShaderMaterial uColorRed={0.356} uColorGreen={0.035} uColorBlue={0.978}/>
        <TitleColor ref={titleRef} position={[0, -0.4, 0.1]} text="GET IN TOUCH" />
        <Html ref={formRef} distanceFactor={0.8} transform position={[0, 0.1, 0]} style={{width: '600px'}} center >
          <div>
            <input className="customInput" disabled={sent} placeholder="Write your email : me@example.com" />
          </div>
          <div>
            <textarea className="customTextarea" disabled={sent} placeholder="Write your question or concern..." />
          </div>
        </Html>
        <mesh ref={buttonRef} position={[0, -0.65, 0.00001]}
        onPointerEnter={(e) => !sent && setHover(true)} onPointerLeave={(e) => !sent && setHover(false)} onClick={() => {
          setSent(true)}
        }>
          <circleGeometry args={[0.15, 128]} />
          <buttonShaderMaterial ref={buttonMaterialRef} />
          <text
            position={[0, 0, 0]}
            fontSize={0.05}
            font={'/ArchivoNarrow-Regular.ttf'}
            color= "#5b09f9"
            maxWidth={1.8}
            text={sent ? "SENT" : "SEND"}
            anchorX="center"
            anchorY="middle"
            ref={buttonTextRef}
          >
            <meshBasicMaterial />
          </text>
        </mesh>
        <Lines ref={lineMaterialRef} color="#FFFFFF" pointsPosition={[
          new THREE.Vector3( viewport.width, viewport.height, 0),
          new THREE.Vector3( 1.5, -0.5, 0),
          new THREE.Vector3( 0.0, -0.15, 0),
          new THREE.Vector3( -1.0, 0.3, 0),
          new THREE.Vector3( -viewport.width, viewport.height/2, 0),
        ]}/>
      </mesh>
    </>
  )
}
