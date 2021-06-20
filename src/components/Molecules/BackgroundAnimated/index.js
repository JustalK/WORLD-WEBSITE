import React, { forwardRef } from 'react'
import { TweenMax as TM } from 'gsap'
import '../../../shaders/BackgroundShaderMaterial'

const BackgroundAnimated = forwardRef(({children, className, viewport}, ref) => {
  return (
    <mesh name="background" position={[0, 0, 0]} onPointerMove={(e) => {
      const theBackground = e.intersections.find(intersection => intersection.eventObject.name === "background");
        TM.to(ref.current.uMouse, 0.5, {
          x: theBackground.uv.x,
          y: theBackground.uv.y
        })
      }}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <backgroundShaderMaterial ref={ref} />
    </mesh>
  )
})

export default BackgroundAnimated;
