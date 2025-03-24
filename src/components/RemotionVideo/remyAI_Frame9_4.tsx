import { useCurrentFrame, spring, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame9_4 = () => {
  const frame = useCurrentFrame();
  
  // Question text animation - typing effect
  const firstLineWords = ["For", "those", "who", "value"];
  const secondLineWords = ["their", "time"];
  const wordDelay = 8; // frames per word
  const wordSpacing = '0.25em';
  const secondLineDelay = firstLineWords.length * wordDelay + 8; // Start after first line + extra delay
  
  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#09090A',
      fontFamily: 'Inter',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Background blur effect */}
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-90%, -50%)',
        background: 'rgba(112, 147, 247, 0.12)',
        filter: 'blur(110px)',
        borderRadius: '20px',
      }} />
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-10%, -50%)',
        background: 'rgba(167, 145, 245, 0.12)',
        filter: 'blur(110px)',
        borderRadius: '20px',
      }} />
      {/* Typing text animation container */}
      <div style={{
        position: 'absolute',
        opacity: interpolate(
          frame,
          [8, 10],
          [0, 1],
          { extrapolateRight: 'clamp' }
        ),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        {/* First line */}
        <h1 style={{
          fontSize: '8.5rem',
          fontWeight: 500,
          margin: 0,
          color: 'white',
          textAlign: 'center',
        //   letterSpacing: '0.01em',
          lineHeight: 1,
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
        }}>
          {firstLineWords.map((word, index) => (
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
                marginRight: index < firstLineWords.length - 1 ? wordSpacing : 0,
                background: index === 4 ? 'linear-gradient(87deg, #5275F0 32%, #8B6FED 100%)' : 'transparent',
                WebkitBackgroundClip: index === 4 ? 'text' : 'none',
                WebkitTextFillColor: index === 4 ? 'transparent' : 'white',
                backgroundClip: index === 4 ? 'text' : 'none',
                textShadow: index === 4 ? '0 2px 10px rgba(163, 100, 255, 0.3)' : '0 2px 10px rgba(255, 255, 255, 0.15)',
              }}
            >
              {word}
            </span>
          ))}
        </h1>
        {/* Second line */}
        <h1 style={{
          fontSize: '9rem',
          fontWeight: 500,
          margin: 0,
          color: 'white',
          textAlign: 'center',
        //   letterSpacing: 'em',
        //   lineHeight: 1,
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
        }}>
          {secondLineWords.map((word, index) => (
            <span
              key={index}
              style={{
                opacity: interpolate(
                  frame - secondLineDelay - index * wordDelay,
                  [0, 1],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
                display: 'inline-block',
                transform: `translateY(${
                  interpolate(
                    frame - secondLineDelay - index * wordDelay,
                    [0, 1],
                    [20, 0],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  )
                }px)`,
                marginRight: index < secondLineWords.length - 1 ? wordSpacing : 0,
                background: 'linear-gradient(87deg, #5275F0 32%, #8B6FED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 10px rgba(163, 100, 255, 0.3)',
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
