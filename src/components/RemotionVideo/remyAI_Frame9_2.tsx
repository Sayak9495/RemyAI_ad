import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame9_2 = () => {
  const frame = useCurrentFrame();
  const scaleAnimationDuration = 9; // 300ms at 30fps
  
  // Scale animation for main text
  const scale = interpolate(
    frame,
    [0, scaleAnimationDuration],
    [1.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Fade in for subtext
  const subtextOpacity = interpolate(
    frame,
    [scaleAnimationDuration, scaleAnimationDuration + 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: '#09090A',
        fontFamily: 'Inter',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      {/* Background blur rectangles */}
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
      
      {/* Main text with scale animation */}
      <div 
        style={{
          transform: `scale(${scale})`,
          color: '#fff',
          fontSize: '164px',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        Order Faster
      </div>

      {/* Subtext with gradient on "interaction" */}
      <div 
        style={{
          opacity: subtextOpacity,
          fontSize: '144px',
          fontWeight: 500,
          display: 'flex',
          gap: '20px',
        }}
      >
        {/* <span style={{ color: '#fff' }}>on every</span> */}
        <span
          style={{
            background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Smarter.
        </span>
      </div>
    </AbsoluteFill>
  );
};
