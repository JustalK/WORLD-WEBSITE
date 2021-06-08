import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export default function Cursor({ cursorPosition }) {
  const viewport = useThree((state) => state.viewport)
  const ref = useRef()

  useFrame(() => {
    ref.current.position.x = viewport.width * ( 2 * cursorPosition.current.x - 1) / 2
    ref.current.position.y = - viewport.height * ( 2 * cursorPosition.current.y - 1) / 2
  })

  return (
    <mesh ref={ref} position={[0, 0, 0.0001]}>
      <circleGeometry args={[0.05, 32]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  )
}
