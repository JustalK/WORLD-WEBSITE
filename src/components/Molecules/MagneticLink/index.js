import React, { useRef, useCallback } from 'react'
import { TweenMax as TM } from 'gsap'
import Text from '../../Atoms/Text'
import Link from '../../Atoms/Link'

export default function MagneticLink({children, className, cursorLink, cursorPosition, setHover, history, to}) {
  const link = useRef()

  const lock = useCallback(ref => {
    if (ref.current) {
      const centerX = ref.current.getBoundingClientRect().left + ref.current.getBoundingClientRect().width / 2
      const centerY = ref.current.getBoundingClientRect().top + ref.current.getBoundingClientRect().height / 2
      const centerXrelative = centerX/window.innerWidth;
      const centerYrelative = centerY/window.innerHeight;
      cursorLink.current = {
        x: cursorPosition.current.x,
        y: cursorPosition.current.y
      }
      TM.to(cursorLink.current, 0.2, {
        x: centerXrelative,
        y: centerYrelative
      })
    }
    setHover(true)
  }, [cursorPosition, cursorLink, setHover])

  return (
    <Link ref={link} className={className} onPointerEnter={(e) => {
      lock(link)
    }} onPointerOut={(e) => {
      setHover(false)
    }} onClick={() => {
      history.push(to)
    }}>
      <Text className="button__text-inner">{children}</Text>
    </Link>
  )
}
