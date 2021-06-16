import React from 'react'
import * as THREE from 'three'

const Lines = ({children, className, viewport}) => {
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
    <line position={[0, 0, 0.00001]} geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={1} linecap={'round'} linejoin={'round'} />
    </line>
  )
}

export default Lines;
