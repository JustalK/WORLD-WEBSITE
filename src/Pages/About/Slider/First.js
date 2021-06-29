import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text";
import BackgroundAnimated from '../../../components/Molecules/BackgroundAnimated'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/TextShaderMaterial'
import * as THREE from 'three'
extend({ Text });

const First = forwardRef(({ scrollPosition, viewport, backgroundRef }, ref) => {
  const textRef = useRef()
  const textMaterialRef = useRef()
  const lineMaterialRef = useRef()
  const [hoverText, setHoverText] = useState(false)

  useImperativeHandle(ref, () => ({
    lineMaterialRef: () => {
      return lineMaterialRef.current;
    },
    textRef: () => {
      return textRef.current;
    },
    textMaterialRef: () => {
      return textRef.current;
    }
  }))

  useEffect(() => {
    textRef.current.sync();
  }, [])

  useFrame((state, delta) => {
    textMaterialRef.current.uVelo = hoverText ? Math.min(1.0, textMaterialRef.current.uVelo + 0.05) : Math.max(0.0, textMaterialRef.current.uVelo - 0.05)
  })

  return (
    <>
      <text
        position={[0, 0, 1.0]}
        fontSize={0.15}
        color= "#ffffff"
        maxWidth={100}
        text={"JUSTAL KEVIN"}
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
        new THREE.Vector3( -1.8, -viewport.height/2, 0),
        new THREE.Vector3( -1.0, 0.1, 0),
        new THREE.Vector3( -0.2, -0.2, 0),
        new THREE.Vector3( 0.4, viewport.height/2, 0),
      ]}/>
      <BackgroundAnimated ref={backgroundRef} viewport={viewport} />
    </>
  )
})

export default First
