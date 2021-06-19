import React, { useRef, useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Text, preloadFont } from "troika-three-text";
import BackgroundAnimated from '../../../components/Molecules/BackgroundAnimated'
extend({ Text });

export default function Box({ scrollPosition, viewport, backgroundRef }) {
  const ref = useRef()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    preloadFont({font: "https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff", characters: 'abcdefghijklmnopqrstuvwxyz'}, () => {
        setLoaded(true)
      }
    )

    ref.current.sync();
  }, [setLoaded])

  return (
    <>
      <text
        position={[0, 0, 1.0]}
        fontSize={0.5}
        color= "#ffffff"
        maxWidth={100}
        text={"Justal Kevin"}
        anchorX="center"
        anchorY="middle"
        ref={ref}
      >
        <meshBasicMaterial />
      </text>
      <BackgroundAnimated ref={backgroundRef} viewport={viewport} />
    </>
  )
}
