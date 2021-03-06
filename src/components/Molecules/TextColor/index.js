import React, { useRef, useEffect, useState, forwardRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text"
import useMobileDetect from '../../../utils/useMobileDetect'
import '../../../shaders/TextColorNoMoveShaderMaterial'
extend({Text})

const TextColor = forwardRef(({position, text},textMeshRef) => {
  const textMaterialRef = useRef()
  const [hoverText, setHoverText] = useState(false)
  const mobile = useMobileDetect();

  useEffect(() => {
    textMeshRef.current.sync()

    const resolution = {
      x: textMeshRef.current.geometry.boundingBox.max.x * 2,
      y: textMeshRef.current.geometry.boundingBox.max.y * 2
    }
    textMaterialRef.current.resolution = resolution
  })

  useFrame((state, delta) => {
    textMaterialRef.current.uTime += delta
    textMaterialRef.current.uVelo = hoverText ? Math.min(1.0, textMaterialRef.current.uVelo + 0.05) : Math.max(0.0, textMaterialRef.current.uVelo - 0.05)
  })
  return (
    <text
      position={position}
      fontSize={mobile.isMobile() ? 0.1 : 0.05}
      font={'/ArchivoNarrow-Regular.ttf'}
      color= "#ffffff"
      maxWidth={mobile.isMobile() ? 1.5 : 1.8}
      text={text}
      anchorX="center"
      anchorY="middle"
      onPointerEnter={(e) => setHoverText(true)} onPointerLeave={(e) => setHoverText(false)}
      onPointerMove={(e) => {
        textMaterialRef.current.uMouse = e.intersections[0].uv
      }}
      ref={textMeshRef}
    >
      <textColorNoMoveShaderMaterial ref={textMaterialRef} color="#000fff" />
    </text>
  )
})

export default TextColor;
