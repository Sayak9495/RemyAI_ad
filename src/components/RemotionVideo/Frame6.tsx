import { useCurrentFrame, spring, interpolate, random } from 'remotion';

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

  // Letter disintegration animation
  const text = 'with samosaa.ai';
  const letters = text.split('');

  // Animation timing
  const startDisintegrate = 30; // Start at frame 30
  const disintegrateDuration = 20; // Take 20 frames to disintegrate
  const holdDuration = 25; // Hold disintegrated state for 25 frames
  const reintegrateDuration = 20; // Take 20 frames to reintegrate

  const getLetterStyle = (index: number) => {
    const seed = random(index * 1000); // Consistent random for each letter
    const offset = index * 1.5; // Slightly reduced stagger
    
    // Calculate animation progress
    const disintegrateProgress = interpolate(
      frame - startDisintegrate - offset,
      [0, disintegrateDuration],
      [0, 1],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );

    const reintegrateProgress = interpolate(
      frame - startDisintegrate - disintegrateDuration - holdDuration - offset,
      [0, reintegrateDuration],
      [1, 0],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );

    const progress = frame < startDisintegrate + disintegrateDuration + holdDuration ? disintegrateProgress : reintegrateProgress;

    // Floating animation with more natural movement
    const floatX = Math.sin(frame * 0.08 + seed * 10) * 8;
    const floatY = Math.cos(frame * 0.06 + seed * 10) * 8;

    // Calculate transformations with wider spread and more dynamic movement
    const translateX = interpolate(progress, [0, 1], [0, (seed - 0.5) * 200]) + floatX;
    const translateY = interpolate(progress, [0, 1], [0, (random(seed + 1) - 0.5) * 150]) + floatY;
    const rotate = interpolate(progress, [0, 1], [0, (random(seed + 2) - 0.5) * 90]);
    const scale = interpolate(progress, [0, 1], [1, random(seed + 3) * 0.3 + 0.9]);
    const opacity = interpolate(progress, [0, 1], [1, 0.85]);

    return {
      display: 'inline-block',
      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      willChange: 'transform',
      textRendering: 'optimizeLegibility' as const,
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const
    };
  };

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
      
      {/* Subtitle "with samosaa.ai" with letter animation */}
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
          color: '#6e9fff',
          textShadow: '0 0 20px rgba(110, 159, 255, 0.6)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          display: 'flex',
          justifyContent: 'center',
          gap: '0.1em',
        }}>
          {letters.map((letter, index) => (
            <span key={index} style={getLetterStyle(index)}>
              {letter}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};
