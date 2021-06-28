import React, { useRef, useState, useEffect } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import Cursor from '../../components/Molecules/Cursor'
import { Text } from "troika-three-text";
import '../../shaders/ImageCustomNoiseMaterial'
import '../../shaders/TextShaderMaterial'

extend({ Text });

export default function Scene({ cursorPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  const backgroundRef = useRef()
  const scrollPosition = useRef(0)
  const textRef = useRef()
  const textMaterialRef = useRef()
  const [hoverText, setHoverText] = useState(false)

  useEffect(() => {
    textRef.current.sync();
  })

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
    textMaterialRef.current.uTime += delta
    textMaterialRef.current.uVelo = hoverText ? Math.min(1.0, textMaterialRef.current.uVelo + 0.05) : Math.max(0.0, textMaterialRef.current.uVelo - 0.05)
  })

  return (
    <mesh position={[0, 0, 0]} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <imageCustomNoiseMaterial ref={backgroundRef} />
      <mesh position={[0, -0.1, 0]}>
        <planeGeometry args={[1.1, 1.2, 32]} />
        <meshBasicMaterial />
      </mesh>
      <mesh position={[-1, 0.2, 0]} rotation={[0, 0, Math.PI/6]}>
        <planeGeometry args={[0.8, 0.15, 32]} />
        <meshBasicMaterial color="blue"/>
      </mesh>
      <mesh position={[1, -0.4, 0]} rotation={[0, 0, Math.PI/6]}>
        <planeGeometry args={[0.8, 0.15, 32]} />
        <meshBasicMaterial color="blue"/>
      </mesh>
      <text
        position={[0, 0.28, 1]}
        fontSize={0.1}
        color= "#ffffff"
        maxWidth={100}
        lineHeight={1.0}
        text={"CONTACT ME"}
        anchorX="center"
        textAlign="center"
        font={'/PlayfairDisplay.ttf'}
        anchorY="middle"
        ref={textRef}
        onPointerEnter={(e) => setHoverText(true)} onPointerLeave={(e) => setHoverText(false)}
        onPointerMove={(e) => {
          textMaterialRef.current.uMouse = e.intersections[0].uv
        }}
      >
        <textShaderMaterial ref={textMaterialRef} />
      </text>
      <Cursor scrollPosition={scrollPosition} cursorPosition={cursorPosition} realCursor={cursorPosition}/>
    </mesh>
  )
}
