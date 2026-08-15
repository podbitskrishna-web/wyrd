import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import type { Group, Mesh } from 'three';
import { WYRD_COLORS, WYRD_MATERIALS } from './wyrdMaterials';

interface WyrdMonolithProps {
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  deviceTier: 'high' | 'normal' | 'low';
}

export function WyrdMonolith({ scrollProgress, pointer, reducedMotion, deviceTier }: WyrdMonolithProps) {
  const group = useRef<Group>(null);
  const innerGroup = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const edgeRef = useRef<Mesh>(null);

  const layerCount = deviceTier === 'low' ? 5 : deviceTier === 'normal' ? 7 : 9;

  const layers = useMemo(() => {
    return Array.from({ length: layerCount }, (_, i) => {
      const t = i / (layerCount - 1);
      return {
        index: i,
        yOffset: (t - 0.5) * 3.2,
        scale: 1 - t * 0.35,
        rotation: t * Math.PI * 0.12,
        opacity: 0.15 + t * 0.55,
        thickness: 0.08 + (1 - t) * 0.12,
      };
    });
  }, [layerCount]);

  const coreMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        ...WYRD_MATERIALS.accent,
        color: WYRD_COLORS.acid,
        emissive: WYRD_COLORS.acid,
        emissiveIntensity: 0.25,
        roughness: 0.35,
        metalness: 0.3,
        transparent: true,
        opacity: 0.9,
      }),
    [],
  );

  const matteMaterial = useMemo(
    () => new MeshStandardMaterial({ ...WYRD_MATERIALS.matte, transparent: true }),
    [],
  );

  useFrame((_, delta) => {
    if (!group.current || !innerGroup.current) return;
    const sp = scrollProgress.current;
    const px = pointer.current.x;
    const py = pointer.current.y;

    // Scroll-driven transformation: layers separate, object tilts, core emerges
    const separation = sp * 1.8;
    const tilt = sp * 0.4;
    const coreEmerge = Math.max(0, sp - 0.3) * 1.2;

    if (!reducedMotion) {
      group.current.rotation.y += delta * 0.05;
    }

    // Pointer parallax — damped, weighty
    const targetRotX = py * 0.15 + tilt;
    const targetRotZ = px * 0.06;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (targetRotZ - group.current.rotation.z) * 0.04;

    // Inner group reacts more subtly
    innerGroup.current.position.y = separation * 0.3;

    // Core grows and glows as you scroll deeper
    if (coreRef.current) {
      const targetScale = 0.3 + coreEmerge * 0.8;
      coreRef.current.scale.setScalar(
        coreRef.current.scale.x + (targetScale - coreRef.current.scale.x) * 0.05,
      );
      (coreRef.current.material as MeshStandardMaterial).emissiveIntensity =
        0.15 + coreEmerge * 0.4;
    }

    // Edge ring slowly counter-rotates
    if (edgeRef.current && !reducedMotion) {
      edgeRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Layered slabs — the architectural monolith */}
      <group ref={innerGroup}>
        {layers.map((layer) => {
          const sep = reducedMotion ? 0 : layer.yOffset;
          return (
            <mesh
              key={layer.index}
              position={[0, sep, 0]}
              rotation={[layer.rotation, 0, 0]}
              scale={[layer.scale, layer.thickness, layer.scale]}
              material={layer.index === Math.floor(layerCount / 2) ? coreMaterial : matteMaterial}
              material-opacity={layer.index === Math.floor(layerCount / 2) ? 0.9 : layer.opacity}
            >
              <boxGeometry args={[2.2, 1, 2.2]} />
            </mesh>
          );
        })}
      </group>

      {/* Inner core — emerges with scroll */}
      <mesh ref={coreRef} position={[0, 0, 0]} scale={0.3} material={coreMaterial}>
        <icosahedronGeometry args={[0.45, 0]} />
      </mesh>

      {/* Edge ring — precision accent */}
      <mesh ref={edgeRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 8, 64]} />
        <meshStandardMaterial
          color={WYRD_COLORS.acid}
          emissive={WYRD_COLORS.acid}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
