import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class BackImageShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vec3 pos = position;
        pos.x += sin(pos.y*10.0+uTime)/100.0;
        pos.y += sin(pos.x*10.0+uTime)/100.0;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      varying vec2 vUv;
      void main()  {
          vec2 newUV = vUv;
          gl_FragColor = vec4(0.378, 0.0, 0.5, 1.0);
      }`
    })
  }

  get uTime() {
    return this.uniforms.uTime.value
  }
  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }
}

extend({ BackImageShaderMaterial })
