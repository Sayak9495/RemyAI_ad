import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame9 = () => {
  const frame = useCurrentFrame();
  const scaleAnimationDuration = 18; // 300ms at 30fps
  
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

      {/* Main text with scale animation */}
      <div 
        style={{
          transform: `scale(${scale})`,
          color: '#fff',
          fontSize: '106.6px',
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: '100%',
        }}
      >
        Remy bonds with you on every
      </div>

      {/* Subtext with gradient on "interaction" */}
      <div 
        style={{
          opacity: subtextOpacity,
          fontSize: '160px',
          fontWeight: 600,
          display: 'flex',
          gap: '20px',
          lineHeight: '100%',
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
          interaction.
        </span>
      </div>
    </AbsoluteFill>
  );
};
