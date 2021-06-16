import React, { forwardRef } from 'react'
import { TweenMax as TM } from 'gsap'
import '../../../shaders/BackgroundShaderMaterial'

const BackgroundAnimated = forwardRef(({children, className, viewport}, ref) => {
  return (
    <mesh position={[0, 0, 0]} onPointerMove={(e) => {
        TM.to(ref.current.uMouse, 0.5, {
          x: e.intersections[0].uv.x,
          y: e.intersections[0].uv.y
        })
      }}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <backgroundShaderMaterial ref={ref} />
    </mesh>
  )
})

export default BackgroundAnimated;
