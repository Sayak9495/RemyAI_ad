import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame8_1 = () => {
  const frame = useCurrentFrame();
  const text = "Thinking";
  const dots = "...";
  const animationDuration = 45; // 1.5 seconds at 30fps
  const cyclesPerSecond = 2; // Animation will cycle 2 times per second

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
