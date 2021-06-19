import React from 'react'
import Cursor from '../../components/Molecules/Cursor'
import { useThree } from '@react-three/fiber'
import Page from './Page'
import First from './Slider/First'

export default function Scene({ cursorPosition, scrollPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  return (
    <>
      <First scrollPosition={scrollPosition} viewport={viewport} />
      <Page text={<h1>2</h1>} color="black" position={[0, -viewport.height, 0]} />
      <Page text={<h1>3</h1>} color="red" position={[0, -2 * viewport.height, 0]} />
      <Page text={<h1>4</h1>} color="blue" position={[0, -3 * viewport.height, 0]} />
      <Cursor cursorPosition={cursorPosition} scrollPosition={scrollPosition} realCursor={cursorPosition}/>
    </>
  )
}
