import React, { useRef } from 'react'
import Cursor from '../../components/Molecules/Cursor'
import { useThree, useFrame } from '@react-three/fiber'
import First from './Slider/First'
import Second from './Slider/Second'
import Third from './Slider/Third'
import Fourth from './Slider/Fourth'
import Fifth from './Slider/Fifth'

export default function Scene({ cursorPosition, scrollPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  const backgroundRef = useRef()
  const firstRef = useRef()

  useFrame((state, delta) => {
    firstRef.current.textMaterialRef().uTime += delta
    firstRef.current.lineMaterialRef().uniforms.dashOffset.value -= 0.01
  })

  return (
    <>
      <First ref={firstRef} viewport={viewport} scrollPosition={scrollPosition} backgroundRef={backgroundRef} />
      <Second viewport={viewport} position={[0, -viewport.height, 0]} scrollPosition={scrollPosition} />
      <Third viewport={viewport} position={[0, -2 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fourth viewport={viewport} position={[0, -3 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fifth viewport={viewport} position={[0, -4 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Cursor cursorPosition={cursorPosition} scrollPosition={scrollPosition} realCursor={cursorPosition}/>
    </>
  )
}
