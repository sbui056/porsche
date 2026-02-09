import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useGarageStore } from '../../stores/garageStore';

/** Keywords that identify body/paint meshes eligible for color override */
const BODY_KEYWORDS = ['body', 'paint', 'car', 'shell', 'hood', 'fender', 'door', 'bumper', 'trim_front', 'trim_rear'];

function isBodyMaterial(name: string): boolean {
  const lower = name.toLowerCase();
  return BODY_KEYWORDS.some((kw) => lower.includes(kw));
}

interface GlbCarProps {
  modelPath: string;
  modelScale: number;
  modelYOffset: number;
  color: string;
  metalness: number;
  roughness: number;
}

export function GlbCar({
  modelPath,
  modelScale,
  modelYOffset,
  color,
  metalness,
  roughness,
}: GlbCarProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene so we don't mutate the cached original
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry && !child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals();
        }
        // Enable shadows on every mesh for high-quality rendering
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Body paint material — automotive clearcoat
  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness,
        roughness,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        envMapIntensity: 2.0,
        reflectivity: 0.5,
        side: THREE.DoubleSide,
      }),
    [color, metalness, roughness]
  );

  // Auto-center the model
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    clonedScene.position.y += size.y / 2;
  }, [clonedScene]);

  // Apply body color only after user actively selects a color
  const hasUserSelectedColor = useGarageStore((s) => s.hasUserSelectedColor);

  useEffect(() => {
    if (!hasUserSelectedColor) return;

    const meshes: THREE.Mesh[] = [];
    let hasKeywordMatch = false;

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) meshes.push(child);
    });

    for (const mesh of meshes) {
      const mat = mesh.material as THREE.Material;
      if (isBodyMaterial(mesh.name || '') || isBodyMaterial(mat?.name || '')) {
        hasKeywordMatch = true;
        break;
      }
    }

    for (const mesh of meshes) {
      const mat = mesh.material as THREE.Material;
      const matches = isBodyMaterial(mesh.name || '') || isBodyMaterial(mat?.name || '');
      if (matches || !hasKeywordMatch) {
        mesh.material = bodyMat;
      }
    }
  }, [clonedScene, bodyMat, hasUserSelectedColor]);

  // Subtle breathing animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = modelYOffset + Math.sin(Date.now() * 0.0008) * 0.003;
    }
  });

  return (
    <group ref={groupRef} scale={modelScale} rotation={[0, Math.PI + (Math.PI * 280 / 180), 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
