import { useEffect, useRef } from 'react';

export interface PointerState {
  x: number;
  y: number;
}

export function useSmoothPointer(damping: number = 0.08): React.MutableRefObject<PointerState> {
  const target = useRef<PointerState>({ x: 0, y: 0 });
  const current = useRef<PointerState>({ x: 0, y: 0 });
  const frame = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * damping;
      current.current.y += (target.current.y - current.current.y) * damping;
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, [damping]);

  return current;
}
