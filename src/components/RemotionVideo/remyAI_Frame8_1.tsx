import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame8_1 = () => {
  const frame = useCurrentFrame();
  const text = "Thinking";
  const dots = "...";
  const animationDuration = 90; // 1.5 seconds at 60fps
  const cyclesPerSecond = 2; // Animation will cycle 2 times per second

  // Animation timing constants
  const CLICK_START = 0;
  const CLICK_DURATION = 15;
  const TYPING_DURATION_PART1 = 60;
  const PAUSE_DURATION = 44;
  const TYPING_DURATION_PART2 = 80;
  const TOTAL_DURATION = CLICK_START + CLICK_DURATION + TYPING_DURATION_PART1 + PAUSE_DURATION + TYPING_DURATION_PART2;
  
  // Calculate dot opacity for sequential fade
  const getDotsOpacity = (index: number) => {
    const dotProgress = interpolate(
      (frame * cyclesPerSecond) % animationDuration,
      [
        (index * animationDuration) / dots.length,
        ((index + 1) * animationDuration) / dots.length
      ],
      [0.3, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
    return dotProgress;
  };

  // Calculate timing for background fade
  const fadeStartFrame = TOTAL_DURATION + -128; // Start fade after all animations complete
  const fadeDuration = 20; // 500ms at 60fps
  
  const blurOpacity = interpolate(
    frame - fadeStartFrame,
    [0, fadeDuration],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: '#09090A',
        fontFamily: 'Inter',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
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
        background: `rgba(112, 147, 247, ${0.12 * blurOpacity})`,
        filter: `blur(${110 * blurOpacity}px)`,
        borderRadius: '20px',
        transition: 'all 0.5s ease-out',
      }} />
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-10%, -50%)',
        background: `rgba(167, 145, 245, ${0.12 * blurOpacity})`,
        filter: `blur(${110 * blurOpacity}px)`,
        borderRadius: '20px',
        transition: 'all 0.5s ease-out',
      }} />

      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div
          style={{
            background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '80px',
            fontWeight: 500,
          }}
        >
          {text}
        </div>
        <div style={{ 
          display: 'flex',
          gap: '4px',
          marginTop: '4px',
        }}>
          {dots.split('').map((dot, index) => (
            <span
              key={index}
              style={{
                background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '80px',
                fontWeight: 500,
                opacity: getDotsOpacity(index),
              }}
            >
              {dot}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
