import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class CursorShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uVeloX: { value: 0.0 },
        uVeloY: { value: 0.0 },
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uVeloX;
      uniform float uVeloY;
      void main() {
        vec3 pos = position * (1.0 - (0.25 * uVeloX + 0.25 * uVeloY));
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      varying vec2 vUv;
      uniform float uVeloX;
      uniform float uVeloY;
      void main()  {
          vec2 newUV = vUv;
          gl_FragColor = vec4(1.0 - 0.5 * uVeloY * uVeloX, 1.0, 1.0, 1.0);
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
}

extend({ CursorShaderMaterial })
