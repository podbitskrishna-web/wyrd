import { Component, type ReactNode, useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceCapability, isWebGLAvailable } from '../hooks/useDeviceCapability';
import { useSmoothPointer } from '../hooks/useSmoothPointer';
import { WyrdSceneFallback } from './WyrdSceneFallback';

const WyrdHeroScene = lazy(() =>
  import('./WyrdHeroScene').then((m) => ({ default: m.WyrdHeroScene })),
);

const SectionScene = lazy(() =>
  import('./SectionScene').then((m) => ({ default: m.SectionScene })),
);

interface ThreeLoaderProps {
  variant: 'hero' | 'process' | 'contact';
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return <WyrdSceneFallback variant="compact" />;
    return this.props.children;
  }
}

export function ThreeLoader({ variant }: ThreeLoaderProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const deviceTier = useDeviceCapability();
  const pointer = useSmoothPointer(0.06);
  const scrollProgress = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idleCallback: number | undefined = window.requestIdleCallback
      ? window.requestIdleCallback(() => setShouldRender(true), { timeout: 1500 })
      : undefined;
    const timeout = idleCallback === undefined ? window.setTimeout(() => setShouldRender(true), 200) : undefined;

    return () => {
      if (idleCallback !== undefined) window.cancelIdleCallback?.(idleCallback);
      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (variant !== 'hero') return;
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (viewportH * 0.8)));
      scrollProgress.current = progress;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  useEffect(() => {
    if (!shouldRender) return;
    if (!isWebGLAvailable()) {
      setFailed(true);
    }
  }, [shouldRender]);

  const useFallback =
    failed ||
    (deviceTier === 'low' && variant !== 'hero') ||
    (reducedMotion && variant !== 'hero');

  if (useFallback) {
    return (
      <div
        ref={variant === 'hero' ? heroRef : undefined}
        className={variant === 'hero' ? 'hero-3d-wrap' : 'section-3d-wrap'}
        aria-hidden="true"
      >
        <WyrdSceneFallback variant={variant === 'hero' ? 'hero' : 'compact'} />
      </div>
    );
  }

  const sceneProps = {
    pointer,
    reducedMotion,
    deviceTier,
  };

  return (
    <div
      ref={variant === 'hero' ? heroRef : undefined}
      className={variant === 'hero' ? 'hero-3d-wrap' : 'section-3d-wrap'}
      aria-hidden="true"
    >
      {shouldRender ? (
        <Suspense fallback={<WyrdSceneFallback variant={variant === 'hero' ? 'hero' : 'compact'} />}>
          <ErrorBoundary onError={() => setFailed(true)}>
            {variant === 'hero' ? (
              <WyrdHeroScene
                scrollProgress={scrollProgress}
                pointer={pointer}
                reducedMotion={reducedMotion}
                deviceTier={deviceTier}
              />
            ) : (
              <SectionScene variant={variant} {...sceneProps} />
            )}
          </ErrorBoundary>
        </Suspense>
      ) : (
        <WyrdSceneFallback variant={variant === 'hero' ? 'hero' : 'compact'} />
      )}
    </div>
  );
}
