import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { WYRD_COLORS } from './wyrdMaterials';

interface ProcessSceneProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}

export function ProcessScene({ pointer, reducedMotion }: ProcessSceneProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Gentle rotation with pointer parallax
    const targetRotY = pointer.current.x * 0.3;
    const targetRotX = -pointer.current.y * 0.2;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.03;

    if (!reducedMotion) {
      group.current.rotation.z += delta * 0.02;
    }
  });

  const stages = [0, 1, 2];

  return (
    <group ref={group}>
      {stages.map((stage) => {
        const angle = (stage / 3) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const y = Math.sin(angle) * 0.8;
        return (
          <group key={stage} position={[x, y, 0]}>
            {/* Base slab */}
            <mesh position={[0, 0, -0.1]}>
              <boxGeometry args={[0.5, 0.5, 0.08]} />
              <meshStandardMaterial
                color={WYRD_COLORS.charcoal}
                roughness={0.8}
                metalness={0.05}
                transparent
                opacity={0.7}
              />
            </mesh>
            {/* Accent edge */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[0.45, 0.45, 0.02]} />
              <meshStandardMaterial
                color={stage === 1 ? WYRD_COLORS.acid : WYRD_COLORS.muted}
                emissive={stage === 1 ? WYRD_COLORS.acid : '#000'}
                emissiveIntensity={stage === 1 ? 0.2 : 0}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Connecting thread */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.2, 0.01, 0.01]} />
        <meshStandardMaterial
          color={WYRD_COLORS.acid}
          emissive={WYRD_COLORS.acid}
          emissiveIntensity={0.15}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
