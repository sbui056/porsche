import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useGarageStore } from '../../stores/garageStore';

/**
 * Cinematic camera controller.
 * Quick 360° orbit around the car, then settles at the optimal 3/4 view.
 */

const FINAL_ANGLE = 4;      // front-left 3/4 — car faces right from here
const ORBIT_RADIUS = 4.5;
const ORBIT_HEIGHT = 2.1;
const FOV_START = 38;
const FOV_END = 35;
const SPIN_DURATION = 4;
const LOOK_TARGET_Y = 0.2;

/** Perlin improved smoothstep — buttery smooth at both ends */
function smoothStep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function CameraController() {
  const controlsRef = useRef<any>(null);
  const cinematicMode = useGarageStore((s) => s.cinematicMode);
  const { camera } = useThree();

  const [introComplete, setIntroComplete] = useState(false);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (introComplete) return;

    elapsed.current += delta;
    const t = Math.min(elapsed.current / SPIN_DURATION, 1);
    const e = smoothStep(t);

    // 1.5 revolutions (540°) — starts and ends at FINAL_ANGLE
    const angle = FINAL_ANGLE - Math.PI * 3 * e;

    // Subtle dolly: slightly further out mid-spin, pulls in at the end
    const radiusBulge = Math.sin(e * Math.PI) * 0.4;
    const radius = ORBIT_RADIUS + radiusBulge;

    camera.position.set(
      Math.sin(angle) * radius,
      ORBIT_HEIGHT,
      Math.cos(angle) * radius,
    );
    camera.lookAt(0, LOOK_TARGET_Y, 0);

    (camera as THREE.PerspectiveCamera).fov = FOV_START + (FOV_END - FOV_START) * e;
    camera.updateProjectionMatrix();

    if (t >= 1) {
      setIntroComplete(true);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={introComplete}
      enableDamping
      dampingFactor={0.04}
      minDistance={2.5}
      maxDistance={7}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.48}
      autoRotate={cinematicMode}
      autoRotateSpeed={0.4}
      target={[0, LOOK_TARGET_Y, 0]}
      enablePan={false}
    />
  );
}
