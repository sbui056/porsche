import { Environment, Lightformer } from '@react-three/drei';

/**
 * High-quality cinematic studio lighting.
 *
 * Environment at 512 resolution for crisp automotive reflections.
 * PCFSoft shadow maps at 2048 on the key light for smooth shadows.
 * Three-point lighting: warm key, cool rim, subtle fill.
 */
export function Lighting() {
  return (
    <>
      {/* High-res environment for sharp reflections */}
      <Environment resolution={512}>
        {/* Large overhead rectangular softbox — signature hood/roof streak */}
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 4, 1]}
          color="#ffffff"
        />
        {/* Cool left side fill strip */}
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[-5, 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 1.5, 1]}
          color="#b0d4ff"
        />
        {/* Warm right side fill strip */}
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[5, 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 1.5, 1]}
          color="#ffe4c4"
        />
        {/* Front accent — illuminates the face the camera starts on */}
        <Lightformer
          form="rect"
          intensity={1.0}
          position={[0, 2, 6]}
          rotation={[0, Math.PI, 0]}
          scale={[8, 2, 1]}
          color="#f0f0ff"
        />
        {/* Rear accent light for edge definition */}
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, 2, -6]}
          rotation={[0, 0, 0]}
          scale={[6, 2, 1]}
          color="#e0e8ff"
        />
        {/* Subtle floor bounce */}
        <Lightformer
          form="rect"
          intensity={0.3}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
          color="#111111"
        />
      </Environment>

      {/* Soft ambient fill — environment does the heavy lifting */}
      <ambientLight intensity={0.15} />
    </>
  );
}
