import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class BackgroundCustomColorShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        resolution: { value: new THREE.Vector2(window.innerHeight/window.innerWidth,window.innerHeight/window.innerWidth) },
        uColorRed: { value: 0.0 },
        uColorGreen: { value: 0.0 },
        uColorBlue: { value: 0.0 },
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `
      uniform vec2 resolution;
      uniform float uColorRed;
      uniform float uColorGreen;
      uniform float uColorBlue;
      varying vec2 vUv;
      void main()  {
          gl_FragColor = vec4(uColorRed, uColorGreen, uColorBlue, 1.0);
      }`
    })
  }
  get uColorRed() {
    return this.uniforms.uColorRed.value
  }
  set uColorRed(v) {
    return (this.uniforms.uColorRed.value = v)
  }
  get uColorGreen() {
    return this.uniforms.uColorGreen.value
  }
  set uColorGreen(v) {
    return (this.uniforms.uColorGreen.value = v)
  }
  get uColorBlue() {
    return this.uniforms.uColorBlue.value
  }
  set uColorBlue(v) {
    return (this.uniforms.uColorBlue.value = v)
  }
}

extend({ BackgroundCustomColorShaderMaterial })
