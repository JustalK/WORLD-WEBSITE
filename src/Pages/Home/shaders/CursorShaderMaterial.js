import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class CursorShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uVeloX: { value: 0.0 },
        uVeloY: { value: 0.0 },
        uHover: { value: 0.0 },
        uTime: { value: 0 },
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uHover;
      uniform float uVeloX;
      uniform float uVeloY;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position * uHover * (1.0 - (0.25 * uVeloX + 0.25 * uVeloY));
        pos.x += (1.0 - uHover) * sin(pos.y*5.0+uTime)/100.0;
        pos.y += (1.0 - uHover) * sin(pos.x*5.0+uTime)/100.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      varying vec2 vUv;
      uniform float uVeloX;
      uniform float uVeloY;
      uniform float uHover;
      void main()  {
          vec2 newUV = vUv;
          gl_FragColor = vec4(1.0 - 0.022 * uVeloY * uVeloX - 0.022 * (uHover - 1.0), 1.0 - 0.965 * uVeloY * uVeloX - 0.965 * (uHover - 1.0), 1.0 - 0.744 * uVeloY * uVeloX - 0.744 * (uHover - 1.0), 1.0);
      }`
    })
  }
  get uVeloX() {
    return this.uniforms.uVeloX.value
  }
  set uVeloX(v) {
    return (this.uniforms.uVeloX.value = v)
  }
  get uVeloY() {
    return this.uniforms.uVeloY.value
  }
  set uVeloY(v) {
    return (this.uniforms.uVeloY.value = v)
  }
  get uHover() {
    return this.uniforms.uHover.value
  }
  set uHover(v) {
    return (this.uniforms.uHover.value = v)
  }
  get uTime() {
    return this.uniforms.uTime.value
  }
  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }
}

extend({ CursorShaderMaterial })
