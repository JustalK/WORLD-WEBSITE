import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import BackgroundAnimated from '../../../components/Molecules/BackgroundAnimated'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/TextShaderMaterial'
import * as THREE from 'three'
extend({ Text });

const First = forwardRef(({ scrollPosition, viewport, backgroundRef }, ref) => {
  const textRef = useRef()
  const lineMaterialRef = useRef()
  const textMaterialRef = useRef()

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

  return (
    <>
      <text
        position={[0, 0, 1.0]}
        fontSize={0.15}
        color= "#ffffff"
        maxWidth={100}
        text={"JUSTAL KEVIN"}
        anchorX="center"
        font={'/PlayfairDisplay.ttf'}
        anchorY="middle"
        ref={textRef}
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
