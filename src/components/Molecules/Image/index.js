import React, { useRef, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three"
import { TweenMax as TM } from 'gsap'
import '../../../shaders/ImageShaderWhiteMaterial'
import '../../../shaders/BackImageShaderMaterial'

export default function Image({ position, mobile }) {
  const ref = useRef()
  const back = useRef()
  const mesh = useRef()
  const [hover, setHover] = useState(false)
  const [tDiffuse] = useLoader(THREE.TextureLoader, ['./2.jpg'])

  useFrame((state, delta) => {
    ref.current.uTime += delta
    back.current.uTime += delta
    ref.current.uVelo = hover ? Math.min(1.0, ref.current.uVelo + 0.05) : Math.max(0.0, ref.current.uVelo - 0.05)
  })

  return (
    <>
      <mesh ref={mesh} name="image" rotation={[0, 0, 0.05]} onPointerEnter={(e) => setHover(true)} onPointerLeave={(e) => setHover(false)} position={position} onPointerMove={(e) => {
        const theImage = e.intersections.find(intersection => intersection.eventObject.name === "image");
        TM.to(ref.current.uMouse, 0.3, {
          x: theImage.uv.x,
          y: theImage.uv.y
        })
      }}>
        <planeGeometry args={[mobile ? 1.2 : 0.95, mobile ? 1.5 : 1.2, 32, 32]} />
        <imageShaderWhiteMaterial ref={ref} tDiffuse={tDiffuse} />
      </mesh>
      <mesh rotation={[0, 0, -0.05]} position={[position[0], position[1], position[2]-0.00005]}>
        <planeGeometry args={[mobile ? 1.2 : 0.95, mobile ? 1.5 : 1.2, 32, 32]} />
        <backImageShaderMaterial ref={back} />
      </mesh>
    </>
  )
}
