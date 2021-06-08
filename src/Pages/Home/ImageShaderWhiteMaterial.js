import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class ImageShaderWhiteMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        tDiffuse: { value: undefined },
        resolution: { value: new THREE.Vector2(window.innerHeight/window.innerWidth,window.innerHeight/window.innerWidth) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uVelo: { value: 0.0 },
        uTime: { value: 0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uVelo;
      void main() {
        vec3 pos = position;
        pos.x += sin(pos.y*10.0*uVelo+uTime)/100.0 * uVelo;
        pos.y += sin(pos.x*10.0*uVelo+uTime)/100.0 * uVelo;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uVelo;
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=resolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          float c = circle(vUv, uMouse, 0.075 + (1.0 - uVelo) * 0.25, 0.01);
          float r = texture2D(tDiffuse, newUV.xy).x;
          float g = texture2D(tDiffuse, newUV.xy).y;
          float b = texture2D(tDiffuse, newUV.xy).z;
          vec4 color = vec4(r * uVelo + r * (1.0 - uVelo), g * (1.0 - uVelo), r * uVelo + b * (1.0 - uVelo), 1.0);

          float finalMask = smoothstep(0.4, 0.5, c);

        	vec4 hover = texture2D(tDiffuse, vUv);

        	vec4 finalImage = mix(hover, color, finalMask);

          gl_FragColor = finalImage;
      }`
    })
  }
  get uVelo() {
    return this.uniforms.uVelo.value
  }
  set uVelo(v) {
    return (this.uniforms.uVelo.value = v)
  }
  get uTime() {
    return this.uniforms.uTime.value
  }
  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }
  get tDiffuse() {
    return this.uniforms.tDiffuse.value
  }
  set tDiffuse(v) {
    return (this.uniforms.tDiffuse.value = v)
  }
  get uMouse() {
    return this.uniforms.uMouse.value
  }
  set uMouse(v) {
    return (this.uniforms.uMouse.value = v)
  }
}

extend({ ImageShaderWhiteMaterial })
