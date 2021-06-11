import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import '../../shaders/CursorShaderMaterial'
import { TweenMax as TM } from 'gsap'

export default function Cursor({ cursorPosition, hover, realCursor }) {
  const viewport = useThree((state) => state.viewport)
  const ref = useRef()
  const miniref = useRef()
  const material = useRef()
  const minimaterial = useRef()
  const lastMouseY = useRef(null);
  const lastMouseX = useRef(null);

  useFrame((state, delta) => {
    material.current.uTime += delta
    minimaterial.current.uTime += delta
    TM.to(miniref.current.position, 0.1, {
      x: viewport.width * ( 2 * realCursor.current.x - 1) / 2,
      y: - viewport.height * ( 2 * realCursor.current.y - 1) / 2
    })
    TM.to(ref.current.position, 0.75, {
      x: viewport.width * ( 2 * cursorPosition.current.x - 1) / 2,
      y: - viewport.height * ( 2 * cursorPosition.current.y - 1) / 2
    })
    TM.to(material.current, 0.3, {
      uHover: hover ? 2.0 : 1.0
    })
    if (lastMouseX.current === null) {
        lastMouseX.current = state.mouse.x
        lastMouseY.current = state.mouse.y
    } else {
      const dx =  state.mouse.x - lastMouseX.current
      const dy =  state.mouse.y - lastMouseY.current
      const speedX = Math.abs(Math.round(dx / delta * 100))
      const speedY = Math.abs(Math.round(dy / delta * 100))

      material.current.uVeloX = Math.abs(speedX) < 10 ? Math.max(0.0, material.current.uVeloX - 0.05) : Math.min(1.0, material.current.uVeloX + 0.05)
      material.current.uVeloY = speedY < 10 ? Math.max(0.0, material.current.uVeloY - 0.05) : Math.min(1.0, material.current.uVeloY + 0.05)

      lastMouseX.current = state.mouse.x
      lastMouseY.current = state.mouse.y
    }
  })

  return (
    <>
      <mesh ref={ref} position={[0, 0, 0.0001]}>
        <circleGeometry args={[0.05, 32]} />
        <cursorShaderMaterial ref={material} color={"#ffffff"} />
      </mesh>
      <mesh ref={miniref} position={[0, 0, 0.0005]}>
        <circleGeometry args={[0.009, 32]} />
        <meshBasicMaterial ref={minimaterial} color={"#ffffff"} />
      </mesh>
    </>
  )
}
