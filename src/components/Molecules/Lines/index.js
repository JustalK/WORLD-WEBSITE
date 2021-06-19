import React from 'react'
import * as THREE from 'three'

const Lines = ({children, className, pointsPosition}) => {
  const nbrPoints = 100
  const curve = new THREE.SplineCurve(pointsPosition);
  const points = curve.getPoints( nbrPoints );
  const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

  return (
    <line position={[0, 0, 0.00001]} geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={1} linecap={'round'} linejoin={'round'} />
    </line>
  )
}

export default Lines;
