import { useCurrentFrame, spring, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame9_4 = () => {
  const frame = useCurrentFrame();
  
  // Question text animation - typing effect
  const firstLineWords = ["For", "those", "who", "value"];
  const secondLineWords = ["their", "time"];
  const wordDelay = 8; // frames per word at 60fps
  const wordSpacing = '0.25em';
  const secondLineDelay = firstLineWords.length * wordDelay + 6; // Start after first line + extra delay
  const subtextDelay = secondLineDelay + secondLineWords.length * wordDelay + 3; // Start after second line
  
  const subtextScale = interpolate(
    frame - subtextDelay,
    [0, 30], // 30 frames = ~500ms
    [1.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease-out
    }
  );

  const subtextOpacity = interpolate(
    frame - subtextDelay,
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

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
      {/* <div style={{
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
      }} /> */}
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

        {/* Subtext */}
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 400,
          color: '#A3A3A3',
          marginTop: '2rem',
          opacity: subtextOpacity,
          transform: `scale(${subtextScale})`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          
          Visit: remy.craveo.in
          {/* <svg 
            width="18" 
            height="18" 
            viewBox="0 0 9 10" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginLeft: '4px',
              marginTop: '2px' // Small adjustment to align with text
            }}
          >
            <g clipPath="url(#clip0_13350_21506)">
              <path 
                d="M1.15356 11.2031L6.76397 5.00043L1.15356 -1.20226" 
                stroke="#A3A3A3" 
                strokeWidth="1.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_13350_21506">
                <rect width="8" height="10" fill="white" transform="matrix(-1 0 0 -1 8.5 10)"/>
              </clipPath>
            </defs>
          </svg> */}
        </div>

        {/* Subtext
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 400,
          color: '#A3A3A3',
          marginTop: '18rem',
          opacity: subtextOpacity,
          transform: `scale(${subtextScale})`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginLeft: '4px'
        }}>
          remy.craveo.in
        </div> */}
      </div>
    </div>
  );
};
