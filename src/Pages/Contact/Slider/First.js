import React, { useRef, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import * as THREE from 'three'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/ImageNoiseMaterial'
import '../../../shaders/TextShaderMaterial'

extend({ Text });

export default function Scene({ scrollPosition, viewport, position }) {
  const backgroundRef = useRef()
  const textRef = useRef()
  const textMaterialRef = useRef()
  const lineMaterialRef = useRef()
  const [hoverText, setHoverText] = useState(false)

  useEffect(() => {
    textRef.current.sync();
  })

  useFrame((state, delta) => {
    lineMaterialRef.current.uTime += delta
    backgroundRef.current.uTime += delta
    textMaterialRef.current.uTime += delta
    textMaterialRef.current.uVelo = hoverText ? Math.min(1.0, textMaterialRef.current.uVelo + 0.05) : Math.max(0.0, textMaterialRef.current.uVelo - 0.05)
  })

  return (
    <mesh position={[0, 0, 0]} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <imageNoiseMaterial ref={backgroundRef} />
      <text
        position={[0, 0, 1.0]}
        fontSize={0.15}
        color= "#ffffff"
        maxWidth={100}
        text={"CONTACT ME"}
        anchorX="center"
        font={'/Barlow-Regular.ttf'}
        anchorY="middle"
        ref={textRef}
        onPointerEnter={(e) => setHoverText(true)} onPointerLeave={(e) => setHoverText(false)}
        onPointerMove={(e) => {
          textMaterialRef.current.uMouse = e.intersections[0].uv
        }}
      >
        <textShaderMaterial ref={textMaterialRef} />
      </text>
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( -viewport.width, -viewport.height, 0),
        new THREE.Vector3( -1.0, 0.1, 0),
        new THREE.Vector3( -0.2, -0.2, 0),
        new THREE.Vector3( 1.2, viewport.height/2, 0),
      ]}/>
    </mesh>
  )
}
