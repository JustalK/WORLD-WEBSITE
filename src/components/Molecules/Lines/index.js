import React, { forwardRef } from 'react'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'meshline'

extend({ MeshLine, MeshLineMaterial })

const Lines = forwardRef(({children, className, pointsPosition},ref) => {
  const nbrPoints = 250
  const linePoints = new THREE.CatmullRomCurve3(pointsPosition).getPoints(nbrPoints);

  return (
    <mesh>
      <meshLine attach="geometry" points={linePoints} />
      <meshLineMaterial
        ref={ref}
        attach="material"
        transparent
        depthTest={true}
        lineWidth={0.005}
        color={'#9c88ff'}
        dashArray={3.0}
        dashRatio={0.05}
      />
    </mesh>
  )
})

export default Lines;
