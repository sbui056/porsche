import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Stats, BakeShadows, MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Lighting } from './Lighting';
import { GlbCar } from './GlbCar';
import { CameraController } from './CameraController';
import { useGarageStore } from '../../stores/garageStore';
import { car } from '../../data/cars';

// Preload car model on module init
useGLTF.preload(car.modelPath);

function SceneContent() {
  const selectedColorId = useGarageStore((s) => s.selectedColorId);

  const color = useMemo(
    () => car.colors.find((c) => c.id === selectedColorId) ?? car.colors[0],
    [selectedColorId]
  );

  return (
    <>
      <Lighting />
      <CameraController />

      {/* Reflective showroom floor — high-res reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 150]}
          resolution={1024}
          mixBlur={1}
          mixStrength={0.5}
          roughness={0.95}
          depthScale={0}
          color="#080808"
          metalness={0.6}
          mirror={0.5}
        />
      </mesh>

      {/* Car model */}
      <Suspense fallback={null}>
        <GlbCar
          modelPath={car.modelPath}
          modelScale={car.modelScale}
          modelYOffset={car.modelYOffset}
          color={color.hex}
          metalness={color.metalness}
          roughness={color.roughness}
        />
      </Suspense>

      <BakeShadows />
      <Preload all />
    </>
  );
}

export function CarScene() {
  const showPerformanceHud = useGarageStore((s) => s.showPerformanceHud);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [1.75, 2.2, 4.15],  // matches spin start, elevated for diagonal down view
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        dpr={[1.5, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          precision: 'highp',
        }}
        shadows="soft"
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        style={{ background: '#09090b' }}
      >
        <color attach="background" args={['#09090b']} />
        <fog attach="fog" args={['#09090b', 10, 25]} />

        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>

        {showPerformanceHud && <Stats />}
      </Canvas>
    </div>
  );
}
