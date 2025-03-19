import { useCurrentFrame, spring, interpolate, staticFile } from 'remotion';

export const Frame5 = () => {
  const frame = useCurrentFrame();
  
  // Product exit animation
  const productExitSpring = spring({
    frame: Math.max(0, frame),
    from: 0,
    to: 1,
    fps: 30,
    config: { mass: 0.5, stiffness: 100, damping: 12 }
  });
  
  const productOpacity = interpolate(
    productExitSpring,
    [0, 0.3],
    [1, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const productScale = interpolate(
    productExitSpring,
    [0, 0.3],
    [1, 0.8],
    { extrapolateRight: 'clamp' }
  );
  
  // Question text animation - typing effect
  const words = ["What", "to", "order", "tonight?"];
  const wordDelay = 10; // frames per word
  const wordSpacing = '0.3em';
  
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
    }}>
      
      {/* Typing text animation */}
      <div style={{
        position: 'absolute',
        opacity: interpolate(
          frame,
          [8, 10],
          [0, 1],
          { extrapolateRight: 'clamp' }
        ),
      }}>
        <h1 style={{
          fontSize: '7.5rem',
          fontWeight: 900,
          margin: 0,
          color: 'white',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
        }}>

          {words.map((word, index) => (
            <span
              key={index}
              style={{
                opacity: interpolate(
                  frame - index * wordDelay,
                  [0, 1],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
                display: 'inline-block',
                transform: `translateY(${
                  interpolate(
                    frame - index * wordDelay,
                    [0, 1],
                    [20, 0],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  )
                }px)`,
                marginRight: index < words.length - 1 ? wordSpacing : 0,
                color: index === 3 ? '#a364ff' : 'white',
                textShadow: index === 3 ? '0 2px 10px rgba(163, 100, 255, 0.3)' : '0 2px 10px rgba(255, 255, 255, 0.15)',
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};
