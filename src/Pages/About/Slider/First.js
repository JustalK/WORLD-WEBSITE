import React, { useRef, useEffect, forwardRef } from 'react'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
import BackgroundAnimated from '../../../components/Molecules/BackgroundAnimated'
import Lines from '../../../components/Molecules/Lines'
import '../../../shaders/TextShaderMaterial'
import * as THREE from 'three'
extend({ Text });

const First = forwardRef(({ scrollPosition, viewport, backgroundRef }, nameRef) => {
  const ref = useRef()

  useEffect(() => {
    ref.current.sync();
  }, [])

  return (
    <>
      <text
        position={[0, 0, 1.0]}
        fontSize={0.2}
        color= "#ffffff"
        maxWidth={100}
        text={"Justal Kevin"}
        anchorX="center"
        anchorY="middle"
        ref={ref}
        onPointerMove={(e) => {
          nameRef.current.uMouse = e.intersections[0].uv
        }}
      >
        <textShaderMaterial ref={nameRef} />
      </text>
      <Lines pointsPosition={[
        new THREE.Vector2( -1.8, -viewport.height/2),
        new THREE.Vector2( -1.0, 0.1),
        new THREE.Vector2( -0.2, -0.2),
        new THREE.Vector2( 0.4, viewport.height/2),
      ]}/>
      <BackgroundAnimated ref={backgroundRef} viewport={viewport} />
    </>
  )
})

export default First
