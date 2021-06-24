import React, { useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Text } from "troika-three-text";
import Lines from '../../../components/Molecules/Lines'
extend({ Text });

export default function Third({ viewport, position, scrollPosition }) {
  const descriptionRef = useRef()

  useEffect(() => {
    descriptionRef.current.sync()
  })

  useFrame(() => {
    console.log(scrollPosition)
    descriptionRef.current.position.x = 2.0 - scrollPosition.current;
  })

  return (
    <mesh position={position} >
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <meshPhongMaterial color="#000000" />
      <text
        position={[0, 0, 0.1]}
        fontSize={0.05}
        color= "#ffffff"
        maxWidth={1.8}
        text={"I'm a french developer with more than 5 years of internationnal experiences. Through the year, I have worked with many frameworks such as React, Vue.js, Three.js, Node.js. On my spare time, I improve my skill by developing new websites or app, freelancing or experimenting on github."}
        anchorX="center"
        anchorY="middle"
        ref={descriptionRef}
      >
        <meshBasicMaterial color="#000fff" />
      </text>
    </mesh>
  )
}
