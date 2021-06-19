import React, { useRef, useEffect } from 'react'
import { extend } from '@react-three/fiber'
import { Text } from "troika-three-text";
extend({ Text });

export default function Second({ text, color, viewport, position }) {
  const ref = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    titleRef.current.sync()
    descriptionRef.current.sync()
  })

  return (
    <>
      <mesh position={position} onPointerMove={(e) => {
        ref.current.uMouse = e.intersections[0].uv
      }}>
        <planeGeometry args={[viewport.width, viewport.height, 1]} />
        <meshBasicMaterial ref={ref} color='#000000' />
        <text
          position={[0, 0.5, 0.1]}
          fontSize={0.2}
          color= "#ffffff"
          maxWidth={100}
          text={"ABOUT ME"}
          anchorX="center"
          anchorY="middle"
          ref={titleRef}
        >
          <meshBasicMaterial color="#000fff" />
        </text>
        <text
          position={[0, 0.0, 0.1]}
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
        <mesh position={[-0.2, -0.5, 1.1]}>
          <planeGeometry args={[0.5, 0.5, 32]} />
          <meshBasicMaterial ref={ref} color='#ffffff' />
        </mesh>
        <mesh position={[0.4, -0.7, 0.7]}>
          <planeGeometry args={[0.5, 0.5, 32]} />
          <meshBasicMaterial ref={ref} color='#ffffff' />
        </mesh>
      </mesh>
    </>
  )
}
