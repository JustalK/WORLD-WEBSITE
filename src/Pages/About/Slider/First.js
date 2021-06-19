import React, { useRef } from 'react'
import { Html } from '@react-three/drei'

export default function Box({ scrollPosition, viewport }) {
  const ref = useRef()
  return (
    <>
      <mesh position={[ 0.27 * viewport.width, -0.1 * viewport.height, -0.535]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.4]} />
        <meshPhongMaterial ref={ref} color={'#fff74f'} />
      </mesh>
      <mesh position={[ 0.2 * viewport.width, -0.2 * viewport.height, -1.1]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshPhongMaterial ref={ref} color={'#5863D8'} />
      </mesh>
      <mesh position={[ 0.095 * viewport.width, -0.1 * viewport.height, -0.5]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.4]} />
        <meshPhongMaterial ref={ref} color={'#dfffff'} />
      </mesh>
      <mesh position={[ 0.051 * viewport.width, -0.078 * viewport.height, -0.6]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <boxGeometry args={[0.45, 0.2, 0.2]} />
        <meshPhongMaterial ref={ref} color={'#dfffff'} />
      </mesh>
      <mesh position={[ 1.27 * viewport.width, -1.21 * viewport.height, -4.45]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <boxGeometry args={[10, 2, 2]} />
        <meshBasicMaterial ref={ref} color={'#dfffff'} />
      </mesh>
      <mesh position={[ 1.166 * viewport.width, 0.745 * viewport.height, -3]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <planeGeometry args={[10, 4.35, 1]} />
        <meshPhongMaterial ref={ref} color={'#5a3ac7'} />
      </mesh>
      <mesh position={[ -1.085 * viewport.width, -2.042 * viewport.height, -0.3]} rotation={[Math.PI/8, Math.PI/8, 0]}>
        <planeGeometry args={[10, 4.35, 1]} />
        <meshPhongMaterial ref={ref} color={'#5a3ac7'} />
      </mesh>
      <Html position={[-0.1 * viewport.width, 0, 1.1]} className="label" style={{'pointerEvents': 'none', width: '100vw'}} center>
        <h1 className='dark'>Hello, my<br />name's Kevin.<br />I'm a<br />Full Stack developer.</h1>
      </Html>
    </>
  )
}
