import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame2 = () => {
  const frame = useCurrentFrame();
  
  // Animation timing (at 30fps)
  const SCALE_DURATION = 24; // 300ms for scale animation
  const QUESTION_MARK_START = 24; // Start showing ? after scale down

  // Scale animation
  const scale = interpolate(
    frame,
    [0, SCALE_DURATION],
    [1, 0.9],
    {
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Quartic ease-out for smoother animation
    }
  );

  // Question mark opacity
  const questionMarkOpacity = interpolate(
    frame - QUESTION_MARK_START,
    [0, 3], // 100ms fade in
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
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
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        transform: `scale(${scale})`,
      }}>
        <h1 style={{
          fontSize: '146px',
          fontWeight: 600,
          color: '#F5F5F7',
          margin: 0,
        }}>
          Confused what to
        </h1>
        <h1 style={{
          fontSize: '146px',
          fontWeight: 600,
          color: '#F5F5F7',
          margin: 0,
          marginLeft: '2rem',
        }}>
          Order?
        </h1>
      </div>
    </div>
  );
};
