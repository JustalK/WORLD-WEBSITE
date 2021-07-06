import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class ButtonShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        resolution: { value: new THREE.Vector2(window.innerHeight/window.innerWidth,window.innerHeight/window.innerWidth) },
        uTime: { value: 0.0 },
        uHover: { value: 0.0 },
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uHover;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.y -= uHover * sin(pos.y*50.0+uTime)/100.0;
        pos.y += uHover * sin(pos.x*50.0+uTime)/100.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }`,
      fragmentShader: `
      uniform vec2 resolution;
      uniform float uHover;
      varying vec2 vUv;
      uniform float uTime;
      void main()  {
          gl_FragColor = vec4(1.0 + uHover * -2.0, 1.0 + uHover * -2.0, 1.0 + uHover * -2.0, 1.0);
      }`
    })
  }
  get uTime() {
    return this.uniforms.uTime.value
  }
  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }
  get uHover() {
    return this.uniforms.uHover.value
  }
  set uHover(v) {
    return (this.uniforms.uHover.value = v)
  }
}

extend({ ButtonShaderMaterial })
