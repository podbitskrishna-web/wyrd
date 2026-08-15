import { useEffect, useState } from 'react';

export type DeviceTier = 'high' | 'normal' | 'low';

function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return 'normal';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const smallScreen = window.innerWidth < 768;

  if (isMobile && smallScreen) return 'low';
  if (cores <= 4 && memory <= 2) return 'low';
  if (cores <= 6 && isMobile) return 'normal';
  return 'high';
}

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('normal');

  useEffect(() => {
    setTier(detectTier());
  }, []);

  return tier;
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
    return gl !== null;
  } catch {
    return false;
  }
}
