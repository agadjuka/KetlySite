/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace JSX {
  interface IntrinsicElements {
    "a-scene": any;
    "a-entity": any;
    "a-assets": any;
    "a-asset-item": any;
    "a-plane": any;
    "a-gltf-model": any;
  }
}

interface Window {
  XR8?: {
    loadChunk?: (name: string) => Promise<void>;
    [key: string]: any;
  };
}

