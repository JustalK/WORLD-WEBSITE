import React from 'react'
import Cursor from '../../components/Molecules/Cursor'
import { useThree } from '@react-three/fiber'
import First from './Slider/First'
import Second from './Slider/Second'
import Third from './Slider/Third'
import Fourth from './Slider/Fourth'

export default function Scene({ cursorPosition, scrollPosition, history }) {
  const viewport = useThree((state) => state.viewport)

  return (
    <>
      <First viewport={viewport} scrollPosition={scrollPosition} />
      <Second viewport={viewport} position={[0, -viewport.height, 0]} scrollPosition={scrollPosition} />
      <Third viewport={viewport} position={[0, -2 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Fourth viewport={viewport} position={[0, -3 * viewport.height, 0]} scrollPosition={scrollPosition} />
      <Cursor cursorPosition={cursorPosition} scrollPosition={scrollPosition} realCursor={cursorPosition}/>
    </>
  )
}
