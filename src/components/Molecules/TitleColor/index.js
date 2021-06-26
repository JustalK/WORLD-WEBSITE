import React, { useRef, useEffect, useState, forwardRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text"
import '../../../shaders/TextColorShaderMaterial'
extend({Text})

const TitleColor = forwardRef(({position, text},titleRef) => {
  const titleMaterialRef = useRef()
  const [hoverText, setHoverText] = useState(false)

  useEffect(() => {
    titleRef.current.sync()
  })

  useFrame((state, delta) => {
    titleMaterialRef.current.uVelo = hoverText ? Math.min(1.0, titleMaterialRef.current.uVelo + 0.05) : Math.max(0.0, titleMaterialRef.current.uVelo - 0.05)
  })

  return (
    <text
      position={position}
      fontSize={0.2}
      color= "#ffffff"
      maxWidth={100}
      text={text}
      anchorX="center"
      anchorY="middle"
      onPointerEnter={(e) => setHoverText(true)} onPointerLeave={(e) => setHoverText(false)}
      onPointerMove={(e) => {
        titleMaterialRef.current.uMouse = e.intersections[0].uv
      }}
      ref={titleRef}
    >
      <textColorShaderMaterial ref={titleMaterialRef} color="#000fff" />
    </text>
  )
})

export default TitleColor;
