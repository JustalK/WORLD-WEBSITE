import React, { useRef, useState, useEffect } from 'react'
import Image from '../../components/Molecules/Image'
import Cursor from '../../components/Molecules/Cursor'
import MagneticLink from '../../components/Molecules/MagneticLink'
import FloatingLink from '../../components/Molecules/FloatingLink'
import Lines from '../../components/Molecules/Lines'
import BackgroundAnimated from '../../components/Molecules/BackgroundAnimated'
import Arrow from '../../components/Molecules/Arrow'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Splitting from 'splitting'
import {ROUTE_ABOUT} from '../../Constants/Routes'
import * as THREE from 'three'
import { Text } from "troika-three-text";
import '../../shaders/TextShaderMaterial'

extend({ Text });

export default function Scene({ cursorPosition, history }) {
  const scrollPosition = useRef(0)
  const lineMaterialRef = useRef(0)
  const viewport = useThree((state) => state.viewport)
  const loatingViewRef = useRef()
  const cursorLinkRef = useRef({x: 0, y:0})
  const backgroundRef = useRef()
  const textRef = useRef()
  const textMaterialRef = useRef()
  const [hover, setHover] = useState(false)
  const [hoverText, setHoverText] = useState(false)

  useEffect(() => {
    textRef.current.sync();
    Splitting()
  })

  useFrame((state, delta) => {
    backgroundRef.current.uTime += delta
    textMaterialRef.current.uTime += delta
    textMaterialRef.current.uVelo = hoverText ? Math.min(1.0, textMaterialRef.current.uVelo + 0.05) : Math.max(0.0, textMaterialRef.current.uVelo - 0.05)
    lineMaterialRef.current.uniforms.dashOffset.value -= 0.01
    loatingViewRef.current.getOutside().style.transform = `translate3d(${loatingViewRef.current.getOutsideTransform().x}px, ${loatingViewRef.current.getOutsideTransform().y}px, 0)`;
  })

  return (
    <>
      <Lines ref={lineMaterialRef} pointsPosition={[
        new THREE.Vector3( -viewport.width/2, 0.1 * viewport.height/2, 0),
        new THREE.Vector3( - 0.5 * viewport.width/2, 0.7 * viewport.height/2, 0),
        new THREE.Vector3( 0, 0, 0),
        new THREE.Vector3( 0.25 * viewport.width/2, -0.6 * viewport.height/2, 0),
        new THREE.Vector3( 0.6 * viewport.width/2, viewport.height/2, 0),
      ]}/>
      <text
        position={[0, 0.28, 1]}
        fontSize={0.1}
        color= "#ffffff"
        maxWidth={100}
        lineHeight={1.0}
        text={"ANY VARIATION\nIS ANOTHER WORLD"}
        anchorX="center"
        textAlign="center"
        font={'/PlayfairDisplay.ttf'}
        anchorY="middle"
        ref={textRef}
        onPointerEnter={(e) => setHoverText(true)} onPointerLeave={(e) => setHoverText(false)}
        onPointerMove={(e) => {
          textMaterialRef.current.uMouse = e.intersections[0].uv
        }}
      >
        <textShaderMaterial ref={textMaterialRef} />
      </text>
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
      <Cursor cursorPosition={hover ? cursorLinkRef : cursorPosition} realCursor={cursorPosition} scrollPosition={scrollPosition} hover={hover} />
      <Image position={[0, - 0.2 * viewport.height / 2, 0.0001]} />
      <BackgroundAnimated ref={backgroundRef} viewport={viewport} />
    </>
  )
}
