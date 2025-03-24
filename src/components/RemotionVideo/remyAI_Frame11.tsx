import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame11 = () => {
  const frame = useCurrentFrame();
  
  const rotatingTexts = [
    'Scrolling?',
    'Same Choices?',
    'Boring Feeds?'
  ];

  // Animation timing (at 30fps)
  const ROTATION_DURATION = 6; // 200ms for rotation
  const DISPLAY_DURATION = 25; // 500ms display time
  const CYCLE_DURATION = ROTATION_DURATION + DISPLAY_DURATION;
  
  // Calculate current text index
  const currentIndex = Math.floor(frame / CYCLE_DURATION) % rotatingTexts.length;
  const cycleProgress = (frame % CYCLE_DURATION) / CYCLE_DURATION;
  
  // Rotation animation
  const rotationProgress = interpolate(
    frame % CYCLE_DURATION,
    [0, ROTATION_DURATION],
    [0, 1],
    {
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease-out
    }
  );

  // Opacity for smooth text transition
  const opacity = interpolate(
    frame % CYCLE_DURATION,
    [0, ROTATION_DURATION * 0.5, ROTATION_DURATION],
    [0, 0.5, 1],
    {
      extrapolateRight: 'clamp',
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
      <h1 style={{
        fontSize: '8rem',
        fontWeight: 700,
        color: '#F5F5F7',
        margin: 0,
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        // maxWidth: '1260px',
      }}>
        <span>Tired of</span>
        <span style={{
          opacity,
          transform: `rotateX(${360 * rotationProgress}deg)`,
          display: 'inline-block',
          transformOrigin: 'center',
        }}>
          {rotatingTexts[currentIndex]}
        </span>
      </h1>
    </div>
  );
};
