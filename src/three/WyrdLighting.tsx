import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { DirectionalLight, PointLight, AmbientLight } from 'three';
import { WYRD_COLORS } from './wyrdMaterials';

export function WyrdLighting() {
  const keyLight = useRef<DirectionalLight>(null);
  const rimLight = useRef<PointLight>(null);
  const ambient = useRef<AmbientLight>(null);

  useFrame(({ clock }) => {
    if (rimLight.current) {
      rimLight.current.intensity = 1.2 + Math.sin(clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.18} color={WYRD_COLORS.paper} />
      <directionalLight
        ref={keyLight}
        position={[4, 6, 5]}
        intensity={1.5}
        color={WYRD_COLORS.warmLight}
        castShadow={false}
      />
      <pointLight
        ref={rimLight}
        position={[-5, 2, -3]}
        intensity={1.2}
        color={WYRD_COLORS.acid}
        distance={15}
        decay={2}
      />
      <pointLight
        position={[2, -3, 4]}
        intensity={0.4}
        color={WYRD_COLORS.paper}
        distance={10}
        decay={2}
      />
    </>
  );
}
