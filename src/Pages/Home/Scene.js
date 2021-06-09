import React, { useRef } from 'react'
import Image from './Image'
import Cursor from './Cursor'
import { useThree, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { TweenMax as TM } from 'gsap'
import './shaders/BackgroundShaderMaterial'
import * as THREE from 'three'

export default function Scene({ cursorPosition }) {
  const viewport = useThree((state) => state.viewport)
  const material = useRef()

  useFrame((state, delta) => {
    material.current.uTime += delta
  })

  const nbrPoints = 100
  const curve = new THREE.SplineCurve( [
    new THREE.Vector2( -viewport.width/2, 0.1 * viewport.height/2),
    new THREE.Vector2( - 0.5 * viewport.width/2, 0.7 * viewport.height/2),
    new THREE.Vector2( 0, 0 ),
    new THREE.Vector2( 0.25 * viewport.width/2, -0.6 * viewport.height/2),
    new THREE.Vector2( 0.6 * viewport.width/2, viewport.height/2),
  ]);
  const points = curve.getPoints( nbrPoints );
  const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

  return (
    <>
      <Html position={[0, 0.6 * viewport.height / 2, 0]} style={{'pointerEvents': 'none', width: '100vw'}} center >
        <h1>Any Variation<br />is another world</h1>
      </Html>
      <Html position={[0, 0.95 * viewport.height / 2, 0]} style={{width: '100vw'}} center >
        <nav>
        <a href="/html/">HTML</a>
        <a href="/css/">CSS</a>
        <a href="/js/">JavaScript</a>
        <a href="/python/">Python</a>
        </nav>
      </Html>
      <Cursor cursorPosition={cursorPosition} />
      <Image position={[0, - 0.2 * viewport.height / 2, 0.0001]} />
      <line position={[0, 0, 0.00001]} geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={1} linecap={'round'} linejoin={'round'} />
      </line>
      <mesh position={[0, 0, 0]}onPointerMove={(e) => {
          TM.to(material.current.uMouse, 0.5, {
            x: e.intersections[0].uv.x,
            y: e.intersections[0].uv.y
          })
        }}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <backgroundShaderMaterial ref={material} />
      </mesh>
    </>
  )
}
