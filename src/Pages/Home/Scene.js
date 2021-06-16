import React, { useRef, useState, useEffect } from 'react'
import Image from '../../components/Molecules/Image'
import Cursor from '../../components/Molecules/Cursor'
import MagneticLink from '../../components/Molecules/MagneticLink'
import FloatingLink from '../../components/Molecules/FloatingLink'
import BackgroundAnimated from '../../components/Molecules/BackgroundAnimated'
import Arrow from '../../components/Molecules/Arrow'
import { useThree, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import Splitting from 'splitting'
import {ROUTE_ABOUT} from '../../Constants/Routes'

export default function Scene({ cursorPosition, history }) {
  const viewport = useThree((state) => state.viewport)
  const loatingViewRef = useRef()
  const cursorLinkRef = useRef({x: 0, y:0})
  const backgroundRef = useRef()
  const [hover, setHover] = useState(false)

  useEffect(() => {
    Splitting()
  })

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
    loatingViewRef.current.getOutside().style.transform = `translate3d(${loatingViewRef.current.getOutsideTransform().x}px, ${loatingViewRef.current.getOutsideTransform().y}px, 0)`;
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
      <Html position={[0, 1.05 * viewport.height / 2, 0]} style={{width: '100vw'}} center >
        <nav>
          <MagneticLink cursorLink={cursorLinkRef} cursorPosition={cursorPosition} setHover={setHover} history={history} to={ROUTE_ABOUT}>Pro</MagneticLink>
          <MagneticLink cursorLink={cursorLinkRef} cursorPosition={cursorPosition} setHover={setHover} history={history} to={ROUTE_ABOUT}>Life</MagneticLink>
        </nav>
      </Html>
      <Html position={[0.32 * viewport.width, -0.25 * viewport.height / 2, 0]} style={{'pointerEvents': 'none', width: '300px'}} center >
        <span className="summary" data-splitting="">This website has been made for keeping the different aspect of my life in one single place. From here, you can discover either my work life or few of my creation more personnal.</span>
      </Html>
      <Html position={[0.42 * viewport.width, -0.42 * viewport.height / 2, 0]} style={{width: '60px', height: '60px'}} center >
        <MagneticLink className="nextPage" cursorLink={cursorLinkRef} cursorPosition={cursorPosition} setHover={setHover} history={history} to={ROUTE_ABOUT}>
          <Arrow />
        </MagneticLink>
      </Html>
      <Html position={[0, -0.75 * viewport.height / 2, 0.1]} center >
        <FloatingLink ref={loatingViewRef} history={history} to={ROUTE_ABOUT}>VIEW</FloatingLink>
      </Html>
      <Cursor cursorPosition={hover ? cursorLinkRef : cursorPosition} realCursor={cursorPosition} hover={hover} />
      <Image position={[0, - 0.2 * viewport.height / 2, 0.0001]} />
      <line position={[0, 0, 0.00001]} geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={1} linecap={'round'} linejoin={'round'} />
      </line>
      <BackgroundAnimated ref={backgroundRef} viewport={viewport} />
    </>
  )
}
