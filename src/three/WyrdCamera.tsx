import { useThree, useFrame } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';

interface WyrdCameraProps {
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}

export function WyrdCamera({ scrollProgress, pointer, reducedMotion }: WyrdCameraProps) {
  const { camera } = useThree();
  const cam = camera as PerspectiveCamera;

  useFrame(() => {
    const sp = scrollProgress.current;

    // Scroll moves camera closer and slightly to the side
    const targetZ = 6 - sp * 2;
    const targetX = pointer.current.x * 0.4;
    const targetY = 0.3 + sp * 0.5 + (reducedMotion ? 0 : pointer.current.y * 0.2);

    cam.position.x += (targetX - cam.position.x) * 0.04;
    cam.position.y += (targetY - cam.position.y) * 0.04;
    cam.position.z += (targetZ - cam.position.z) * 0.04;

    cam.lookAt(0, sp * 0.3, 0);

    // Subtle FOV shift for cinematic depth
    const targetFov = 42 + sp * 8;
    cam.fov += (targetFov - cam.fov) * 0.03;
    cam.updateProjectionMatrix();
  });

  // Set initial background to transparent — CSS provides the backdrop
  useThree(({ scene }) => {
    scene.background = null;
  });

  return null;
}
