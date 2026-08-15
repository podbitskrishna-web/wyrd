import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WyrdMonolith } from './WyrdMonolith';
import { WyrdLighting } from './WyrdLighting';
import { WyrdCamera } from './WyrdCamera';
import type { DeviceTier } from '../hooks/useDeviceCapability';

interface WyrdHeroSceneProps {
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  deviceTier: DeviceTier;
}

export function WyrdHeroScene({ scrollProgress, pointer, reducedMotion, deviceTier }: WyrdHeroSceneProps) {
  const maxDPR = deviceTier === 'high' ? 2 : deviceTier === 'normal' ? 1.5 : 1;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, maxDPR]}
      camera={{ position: [0, 0.3, 6], fov: 42, near: 0.1, far: 50 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <WyrdCamera scrollProgress={scrollProgress} pointer={pointer} reducedMotion={reducedMotion} />
        <WyrdLighting />
        <WyrdMonolith
          scrollProgress={scrollProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          deviceTier={deviceTier}
        />
      </Suspense>
    </Canvas>
  );
}
