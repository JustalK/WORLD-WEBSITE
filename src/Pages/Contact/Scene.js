import React, { useRef } from 'react'
import Cursor from '../../components/Molecules/Cursor'
import { useThree, useFrame } from '@react-three/fiber'
import First from './Slider/First'
import Second from './Slider/Second'
import Third from './Slider/Third'
import Fourth from './Slider/Fourth'
import Fifth from './Slider/Fifth'
import { Html } from '@react-three/drei'
import FloatingLink from '../../components/Molecules/FloatingLink'
import {ROUTE_HOME} from '../../Constants/Routes'

export default function Scene({ cursorPosition, scrollPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  const loatingViewRef = useRef()

  useFrame((state, delta) => {
    loatingViewRef.current.getOutside().style.transform = `translate3d(${loatingViewRef.current.getOutsideTransform().x}px, ${loatingViewRef.current.getOutsideTransform().y}px, 0)`;
  })
  return (
    <>
      <First viewport={viewport} scrollPosition={scrollPosition} />
      <Second viewport={viewport} position={[0, -viewport.height, 0]} scrollPosition={scrollPosition} />
      <Third viewport={viewport} position={[0, -1.5 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fourth viewport={viewport} position={[0, -2.5 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fifth viewport={viewport} position={[0, -3.5 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Html position={[0, -3.5 * viewport.height - 0.5, 0]} center >
        <FloatingLink ref={loatingViewRef} history={history} to={ROUTE_HOME} offset={3.5}>BACK</FloatingLink>
      </Html>
      <Cursor cursorPosition={cursorPosition} scrollPosition={scrollPosition} realCursor={cursorPosition}/>
    </>
  )
}
