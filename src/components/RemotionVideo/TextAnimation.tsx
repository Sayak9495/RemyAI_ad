
import { spring, useCurrentFrame, interpolate } from 'remotion';

export const TextAnimation = () => {
  const frame = useCurrentFrame();
  
  // Frame 1: Purple background with "Order Food" animation (0-48 frames, 1.6 sec)
  const frame1Active = frame < 48;
  const orderTextOpacity = interpolate(
    frame,
    [0, 5],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  // Order text stays for 0.2 sec more (6 frames)
  const orderTextX = interpolate(
    frame,
    [18, 21], // Delayed shift
    [0, -60],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const foodTextOpacity = interpolate(
    frame,
    [18, 21],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const foodTextX = interpolate(
    frame,
    [18, 21],
    [30, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  // Frame 2: White background with "Faster" animation (48-60 frames + 12 extra)
  const frame2Active = frame >= 48 && frame < 72;
  const fasterSpring = spring({
    frame: Math.max(0, frame - 48),
    from: 0,
    to: 1,
    fps: 30,
    config: { mass: 0.4, stiffness: 120, damping: 9 }
  });
  
  const fasterScale = interpolate(fasterSpring, [0, 1], [0.6, 1]);
  const fasterOpacity = frame2Active ? interpolate(
    frame - 48,
    [0, 3, 21, 24], // Extended duration
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) : 0;
  
  // Frame 3: White background with "Smarter" animation (72-96 frames)
  const frame3Active = frame >= 72 && frame < 96;
  const smarterSpring = spring({
    frame: Math.max(0, frame - 72),
    from: 0,
    to: 1,
    fps: 30,
    config: { mass: 0.4, stiffness: 100, damping: 10 }
  });
  
  const smarterRotation = interpolate(smarterSpring, [0, 1], [-8, 0]);
  const smarterScale = interpolate(smarterSpring, [0, 1], [0.7, 1]);
  const smarterOpacity = frame3Active ? interpolate(
    frame - 72,
    [0, 3, 21, 24], // Extended duration
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) : 0;
  
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(160deg, #121214 0%, #0a0a10 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {/* Frame 1: Order Online */}
      {frame1Active && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          <span style={{
            fontSize: '9rem',
            fontWeight: 900,
            background: 'linear-gradient(to right, #ffffff, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: orderTextOpacity,
            transform: `translateX(${orderTextX}px)`,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
          }}>
            Order
          </span>


          <span style={{
            fontSize: '9rem',
            fontWeight: 900,
            background: 'linear-gradient(to right, #ffffff, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: foodTextOpacity,
            transform: `translateX(${foodTextX}px)`,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
          }}>
            Food
          </span>
        </div>
      )}
      
      {/* Frame 2: Faster */}
      {frame2Active && (
        <div style={{
          opacity: fasterOpacity,
          transform: `scale(${fasterScale})`,
        }}>
          {"FASTER".split('').map((letter, index) => {
            const letterDelay = index * 0.5;
            const letterSpring = spring({
              frame: Math.max(0, frame - 30 - letterDelay),
              from: 0,
              to: 1,
              fps: 30,
              config: { mass: 0.3, stiffness: 100, damping: 8 }
            });
            
            const letterY = interpolate(letterSpring, [0, 1], [-20, 0]);
            const letterOpacity = interpolate(letterSpring, [0, 1], [0, 1]);
            
            return (
              <span 
                key={index}
                style={{
                  display: 'inline-block',
                  fontSize: '11rem',
                  fontWeight: 900,
                  background: 'linear-gradient(to right, #a364ff, #a364ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  transform: `translateY(${letterY}px)`,
                  opacity: letterOpacity,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 25px rgba(255, 107, 107, 0.5)',
                  marginRight: '0.1rem',
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      )}
      
      {/* Frame 3: Smarter */}
      {frame3Active && (
        <div style={{
          opacity: smarterOpacity,
          transform: `rotate(${smarterRotation}deg) scale(${smarterScale})`,
        }}>
          {"SMARTER".split('').map((letter, index) => {
            const letterDelay = index * 0.7;
            const letterSpring = spring({
              frame: Math.max(0, frame - 42 - letterDelay),
              from: 0,
              to: 1,
              fps: 30,
              config: { mass: 0.3, stiffness: 100, damping: 8 }
            });
            
            const letterScale = interpolate(letterSpring, [0, 1], [0.5, 1]);
            const letterOpacity = interpolate(letterSpring, [0, 1], [0, 1]);
            
            return (
              <span 
                key={index}
                style={{
                  display: 'inline-block',
                  fontSize: '11rem',
                  fontWeight: 900,
                  background: 'linear-gradient(to right, #9e72ff, #6e9fff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  transform: `scale(${letterScale})`,
                  opacity: letterOpacity,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 25px rgba(158, 114, 255, 0.5)',
                  marginRight: '0.1rem',
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
