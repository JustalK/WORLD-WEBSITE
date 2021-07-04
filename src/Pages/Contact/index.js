import React, { Suspense, useRef } from 'react'
import BlackTransition from '../../Transitions/BlackTransition'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { TweenMax as TM } from 'gsap'
import ScrollContainer from './ScrollContainer'

export default function About({ history }) {
  const cursorPosition = useRef({x: 0.5, y: 0.5})
  const scrollRef = useRef()
  const scroll = useRef(0)
  const page = 4
  const doScroll = (e) => {
    scroll.current = page * e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
    return scroll.current
  }
  return (
    <>
      <BlackTransition />
      <div id="canvas-container" className="bg-dark"  onPointerMove={(e) => {
        TM.to(cursorPosition.current, 0.0, {
          x: e.clientX/window.innerWidth,
          y: e.clientY/window.innerHeight
        })
      }}>
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}
          onCreated={(state) => state.events.connect(scrollRef.current)}
          raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            <ScrollContainer scroll={scroll}>
              <Scene cursorPosition={cursorPosition} scrollPosition={scroll} history={history} />
            </ScrollContainer>
          </Suspense>
        </Canvas>
        <div ref={scrollRef} onScroll={doScroll} className="scroll">
          <div style={{ height: `${(page + 1) * 100}vh`, pointerEvents: 'none' }}></div>
        </div>
      </div>
    </>
  )
}
