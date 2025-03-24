import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame71 = () => {
  const frame = useCurrentFrame();
  
  // Dynamic fast-to-slow contraction
  const progress = interpolate(
    frame,
    [0, 25],
    [0, 1],
    {
      extrapolateRight: 'clamp',
      easing: (t) => {
        // Exponential start with smooth end
        if (t < 0.3) {
          // Super fast initial 30%
          return 3.33 * t * t;
        } else {
          // Very gradual slowdown for remaining 70%
          const p = (t - 0.3) / 0.7;
          return 0.3 + 0.7 * (1 - Math.pow(1 - p, 5));
        }
      }
    }
  );

  const scale = interpolate(progress, [0, 1], [1, 0.80]);

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Inter',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#09090A',
      }}
    >
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
      <div
        style={{

          // background:'red',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          fontSize: '120px',
          fontWeight: 600,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.2,
          width: '100%',
        }}
      >
        Perfect Suggestions in{' '}
        <span
          style={{
            background: 'linear-gradient(90deg, #6e9fff, #9e72ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          One Click
        </span>
      </div>
    </AbsoluteFill>
  );
};
