import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProcessScene } from './ProcessScene';
import { ContactScene } from './ContactScene';
import { WyrdLighting } from './WyrdLighting';
import type { DeviceTier } from '../hooks/useDeviceCapability';

interface SectionSceneProps {
  variant: 'process' | 'contact';
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  deviceTier: DeviceTier;
}

export function SectionScene({ variant, pointer, reducedMotion, deviceTier }: SectionSceneProps) {
  const maxDPR = deviceTier === 'high' ? 1.5 : 1;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      dpr={[1, maxDPR]}
      camera={{ position: [0, 0, 4], fov: 45, near: 0.1, far: 20 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <WyrdLighting />
        {variant === 'process' ? (
          <ProcessScene pointer={pointer} reducedMotion={reducedMotion} />
        ) : (
          <ContactScene pointer={pointer} reducedMotion={reducedMotion} />
        )}
      </Suspense>
    </Canvas>
  );
}
