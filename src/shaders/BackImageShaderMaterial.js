import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class BackImageShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerHeight/window.innerWidth,window.innerHeight/window.innerWidth) }
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
      uniform vec2 uResolution;
      varying vec2 vUv;
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=uResolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          float round = circle(vUv, vec2(1.0, 1.0), 0.25, 2.0);
          float mask = smoothstep(0.4, 0.5, round);
          vec4 purple = vec4(0.378, 0.0, 0.6, 1.0);
          vec4 red = vec4(0.6, 0.0, 0.3, 1.0);
          vec4 result = mix(red, purple, mask);
          gl_FragColor = result;
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
