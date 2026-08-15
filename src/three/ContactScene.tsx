import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, Group } from 'three';
import { WYRD_COLORS } from './wyrdMaterials';

interface ContactSceneProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}

export function ContactScene({ pointer, reducedMotion }: ContactSceneProps) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state) => {
    if (!group.current || !core.current) return;

    const targetRotY = pointer.current.x * 0.5;
    const targetRotX = -pointer.current.y * 0.4;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.04;

    if (!reducedMotion) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {/* Outer wireframe shard */}
      <mesh>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color={WYRD_COLORS.acid}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner solid core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={WYRD_COLORS.acid}
          emissive={WYRD_COLORS.acid}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.4}
          flatShading
        />
      </mesh>

      {/* Thin orbit ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.1, 0.008, 6, 48]} />
        <meshStandardMaterial
          color={WYRD_COLORS.paper}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}
