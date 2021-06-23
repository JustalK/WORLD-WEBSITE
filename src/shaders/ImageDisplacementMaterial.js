import * as THREE from "three"
import { extend } from "@react-three/fiber"

export class ImageDisplacementMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        resolution: { value: new THREE.Vector2(window.innerHeight/window.innerWidth,window.innerHeight/window.innerWidth) },
        uTime: { value: 0.0 },
        uEffectFactor: { value: 1.0 },
        uTextureDisplacementFactor: { value: 0.5 },
        uTexture1: { value: undefined },
        uTexture2: { value: undefined },
        uTextureDisplacement: { value: undefined },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        uniform sampler2D uTextureDisplacement;

        uniform float uTextureDisplacementFactor;
        uniform float uEffectFactor;

        void main() {
          vec2 uv = vUv;

          vec4 uTextureDisplacement = texture2D(uTextureDisplacement, uv);

          vec2 distortedPosition = vec2(uv.x + uTextureDisplacementFactor * (uTextureDisplacement.r*uEffectFactor), uv.y);
          vec2 distortedPosition2 = vec2(uv.x - (1.0 - uTextureDisplacementFactor) * (uTextureDisplacement.r*uEffectFactor), uv.y);

          vec4 _texture = texture2D(uTexture1, distortedPosition);
          vec4 _uTexture2 = texture2D(uTexture2, distortedPosition2);

          vec4 finalTexture = mix(_texture, _uTexture2, uTextureDisplacementFactor);

          gl_FragColor = finalTexture;
        }
      `
    })
  }
  get uTime() {
    return this.uniforms.uTime.value
  }
  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }
  get uEffectFactor() {
    return this.uniforms.uEffectFactor.value
  }
  set uEffectFactor(v) {
    return (this.uniforms.uEffectFactor.value = v)
  }
  get uTextureDisplacementFactor() {
    return this.uniforms.uTextureDisplacementFactor.value
  }
  set uTextureDisplacementFactor(v) {
    return (this.uniforms.uTextureDisplacementFactor.value = v)
  }
  get uTexture1() {
    return this.uniforms.uTexture1.value
  }
  set uTexture1(v) {
    return (this.uniforms.uTexture1.value = v)
  }
  get uTexture2() {
    return this.uniforms.uTexture2.value
  }
  set uTexture2(v) {
    return (this.uniforms.uTexture2.value = v)
  }
  get uTextureDisplacement() {
    return this.uniforms.uTextureDisplacement.value
  }
  set uTextureDisplacement(v) {
    return (this.uniforms.uTextureDisplacement.value = v)
  }
}

extend({ ImageDisplacementMaterial })
