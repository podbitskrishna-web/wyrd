import { useEffect, useRef, useState } from 'react';

interface CursorState {
  x: number;
  y: number;
  variant: 'default' | 'link' | 'explore';
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    setIsTouch(touch);
    if (touch) return;

    const target = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let variant: CursorState['variant'] = 'default';
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setHidden(false);

      const el = e.target as HTMLElement | null;
      if (!el) return;

      if (el.closest('[data-cursor="explore"]')) {
        variant = 'explore';
      } else if (
        el.closest('a, button, input, textarea, [role="button"]')
      ) {
        variant = 'link';
      } else {
        variant = 'default';
      }
    };

    const onLeave = () => setHidden(true);

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = variant === 'explore' ? 2.4 : variant === 'link' ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = variant === 'default' ? '0.5' : '0.8';
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(20px, -50%)`;
        labelRef.current.style.opacity = variant === 'explore' ? '1' : '0';
        labelRef.current.textContent = variant === 'explore' ? 'EXPLORE' : '';
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className={`cursor-system ${hidden ? 'cursor-hidden' : ''}`} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className="cursor-label" />
    </div>
  );
}
