import { useCurrentFrame, spring, interpolate } from 'remotion';

export const Frame6 = () => {
  const frame = useCurrentFrame();
  
  // Main text animation
  const mainTextSpring = spring({
    frame: Math.max(0, frame),
    from: 0,
    to: 1,
    fps: 30,
    config: { mass: 0.5, stiffness: 100, damping: 12 }
  });
  
  const mainTextOpacity = interpolate(mainTextSpring, [0, 1], [0, 1]);
  const mainTextY = interpolate(mainTextSpring, [0, 1], [20, 0]);
  
  // Subtitle animation with delay
  const subtitleSpring = spring({
    frame: Math.max(0, frame - 6),
    from: 0,
    to: 1,
    fps: 30,
    config: { mass: 0.4, stiffness: 100, damping: 10 }
  });
  
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleSpring, [0, 1], [15, 0]);
  
  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(160deg, #121214 0%, #0a0a10 100%)',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
    }}>
      {/* Main text "Now Sorted." */}
      <div style={{
        opacity: mainTextOpacity,
        transform: `translateY(${mainTextY}px)`,
      }}>
        <h1 style={{
          fontSize: '10.5rem',
          fontWeight: 900,
          margin: 0,
          color: 'white',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
        }}>
          Now Sorted.
        </h1>
      </div>
      
      {/* Subtitle "with samosaa.ai" */}
      <div style={{
        opacity: subtitleOpacity,
        transform: `translateY(${subtitleY}px)`,
      }}>
        <h2 style={{
          fontSize: '4.5rem',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          background: 'linear-gradient(to right, #6e9fff, #9e72ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 15px rgba(110, 159, 255, 0.4)',
        }}>
          with samosaa.ai
        </h2>
      </div>
    </div>
  );
};
