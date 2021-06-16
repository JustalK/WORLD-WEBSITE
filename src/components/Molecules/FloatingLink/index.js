import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { TweenMax as TM } from 'gsap'

const FloatingLink = forwardRef(({children, className}, ref) => {
  const centerButton = useRef({x: 0, y:0})
  const outside = useRef('translate3d(0px, 0px, 0)')
  const outsideTransform = useRef({x: 0, y:0})

  useImperativeHandle(ref, () => ({
    getOutside: () => {
     return outside.current;
    },
    getOutsideTransform: () => {
     return outsideTransform.current;
    }
  }));

  useEffect(() => {
    const left = outside.current.getBoundingClientRect().left
    const width = outside.current.getBoundingClientRect().width
    const top = outside.current.getBoundingClientRect().top
    const height = outside.current.getBoundingClientRect().height
    const centerX = left + width/2
    const centerY = top + height/2
    centerButton.current = {x: centerX, y: centerY}
  })

  return (
    <a className="visit" href="/html/" onPointerMove={(e) => {
      const a = e.clientX - centerButton.current.x
      const b = e.clientY - centerButton.current.y
      TM.to(outsideTransform.current, 0.2, {
        x: a * 0.35,
        y: b * 0.35
      })
    }} onPointerOut={(e) => {
      TM.to(outsideTransform.current, 0.2, {
        x: 0,
        y: 0
      })
    }}>
      <span ref={outside}>
        <span>VIEW</span>
      </span>
    </a>
  )
})

export default FloatingLink;
