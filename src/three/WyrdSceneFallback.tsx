export function WyrdSceneFallback({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  if (variant === 'hero') {
    return (
      <div className="fallback-hero-visual" aria-hidden="true">
        <div className="fallback-orbit fallback-orbit-one" />
        <div className="fallback-orbit fallback-orbit-two" />
        <div className="fallback-core">
          <span>W</span>
        </div>
        <span className="fallback-label fallback-label-top">( A / 01 )</span>
        <span className="fallback-label fallback-label-bottom">
          A study in
          <br />
          useful tension
        </span>
      </div>
    );
  }

  return (
    <div className="fallback-compact-visual" aria-hidden="true">
      <div className="fallback-compact-core" />
      <div className="fallback-compact-ring" />
    </div>
  );
}
