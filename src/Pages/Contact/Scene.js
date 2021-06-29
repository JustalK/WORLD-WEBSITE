import React, { useRef } from 'react'
import Cursor from '../../components/Molecules/Cursor'
import { useThree } from '@react-three/fiber'
import First from './Slider/First'
import FloatingLink from '../../components/Molecules/FloatingLink'
import {ROUTE_HOME} from '../../Constants/Routes'
import { Html } from '@react-three/drei'

export default function Scene({ cursorPosition, scrollPosition, history }) {
  const viewport = useThree((state) => state.viewport)

  return (
    <>
      <First viewport={viewport} scrollPosition={scrollPosition} />
      <First viewport={viewport} position={[0, -viewport.height, 0]} scrollPosition={scrollPosition} />
      <Cursor cursorPosition={cursorPosition} scrollPosition={scrollPosition} realCursor={cursorPosition}/>
    </>
  )
}
