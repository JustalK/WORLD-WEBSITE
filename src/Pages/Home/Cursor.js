import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import './shaders/CursorShaderMaterial'

export default function Cursor({ cursorPosition }) {
  const viewport = useThree((state) => state.viewport)
  const ref = useRef()
  const material = useRef()
  const lastMouseY = useRef(null);
  const lastMouseX = useRef(null);

  useFrame((state, delta) => {
    ref.current.position.x = viewport.width * ( 2 * cursorPosition.current.x - 1) / 2
    ref.current.position.y = - viewport.height * ( 2 * cursorPosition.current.y - 1) / 2

    ref.current.position.x = viewport.width * ( 2 * cursorPosition.current.x - 1) / 2
    ref.current.position.y = - viewport.height * ( 2 * cursorPosition.current.y - 1) / 2
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
    <mesh ref={ref} position={[0, 0, 0.0001]}>
      <circleGeometry args={[0.05, 32]} />
      <cursorShaderMaterial ref={material} color={"#ffffff"} />
    </mesh>
  )
}
