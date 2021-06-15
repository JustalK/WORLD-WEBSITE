import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { TweenMax as TM } from 'gsap'
import InitialTransition from '../../Transitions/InitialTransition'

export default function Home({ history }) {
  const cursorPosition = useRef({x: 0, y:0})
  return (
    <>
      <InitialTransition />
      <div id="canvas-container" onPointerMove={(e) => {
        TM.to(cursorPosition.current, 0.0, {
          x: e.clientX/window.innerWidth,
          y: e.clientY/window.innerHeight
        })
      }}>
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.0} />
            <Scene cursorPosition={cursorPosition} history={history} />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
