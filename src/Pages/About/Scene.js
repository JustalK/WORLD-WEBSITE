import React, { useRef } from 'react'
import Cursor from '../../components/Molecules/Cursor'
import { useThree, useFrame } from '@react-three/fiber'
import First from './Slider/First'
import Second from './Slider/Second'
import Third from './Slider/Third'
import Fourth from './Slider/Fourth'
import Fifth from './Slider/Fifth'
import Sixth from './Slider/Sixth'
import FloatingLink from '../../components/Molecules/FloatingLink'
import {ROUTE_HOME} from '../../Constants/Routes'
import { Html } from '@react-three/drei'

export default function Scene({ cursorPosition, scrollPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  const backgroundRef = useRef()
  const firstRef = useRef()
  const loatingViewRef = useRef()

  useFrame((state, delta) => {
    firstRef.current.textMaterialRef().uTime += delta
    firstRef.current.lineMaterialRef().uniforms.dashOffset.value -= 0.01
    loatingViewRef.current.getOutside().style.transform = `translate3d(${loatingViewRef.current.getOutsideTransform().x}px, ${loatingViewRef.current.getOutsideTransform().y}px, 0)`;
  })

  return (
    <>
      <First ref={firstRef} viewport={viewport} scrollPosition={scrollPosition} backgroundRef={backgroundRef} />
      <Second viewport={viewport} position={[0, -viewport.height, 0]} scrollPosition={scrollPosition} />
      <Third viewport={viewport} position={[0, -2 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fourth viewport={viewport} position={[0, -3 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fifth viewport={viewport} position={[0, -4 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Sixth viewport={viewport} position={[0, -5 * viewport.height, 0]} scrollPosition={scrollPosition} history={history} />
      <Html position={[0, -5 * viewport.height - 0.4, 0]} center >
        <FloatingLink ref={loatingViewRef} history={history} to={ROUTE_HOME} offset={5}>BACK</FloatingLink>
      </Html>
      <Cursor cursorPosition={cursorPosition} scrollPosition={scrollPosition} realCursor={cursorPosition}/>
    </>
  )
}
