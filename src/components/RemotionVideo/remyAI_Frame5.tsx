import { useCurrentFrame, spring, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame5 = () => {
  const frame = useCurrentFrame();
  
  // Question text animation - typing effect
  const words = ["Just", "describe", "your", "intent."];
  const wordDelay = 15; // frames per word
  const wordSpacing = '0.4em';
  
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
          fontSize: '133px',
          fontWeight: 600,
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
                // color: index === 3 ? '#a364ff' : 'white',
                background: index === 3 ? 'linear-gradient(87deg, #527BF0 32%, #8B6FED 100%)' : 'transparent',
                WebkitBackgroundClip: index === 3 ? 'text' : 'none',
                WebkitTextFillColor: index === 3 ? 'transparent' : 'white',
                backgroundClip: index === 3 ? 'text' : 'none',
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
