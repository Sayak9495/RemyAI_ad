import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame9_3 = () => {
  const frame = useCurrentFrame();
  const scaleAnimDuration = 9; // 300ms at 30fps
  const typewriterDelay = 12; // 400ms at 30fps
  
  // Scale animation for Remy
  const scale = interpolate(
    frame,
    [0, scaleAnimDuration],
    [1.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // First typewriter text: "AI Food Ordering App"
  const firstText = "AI Food Ordering App";
  const charsPerFrame = 0.5; // Type 1 character every 2 frames (15 chars/sec)
  const firstTypeProgress = Math.min(
    Math.max(0, (frame - typewriterDelay) * charsPerFrame),
    firstText.length
  );

  // Hold the first text for a moment before deleting
  const holdDuration = 30; // 1s hold
  const deleteStart = typewriterDelay + (firstText.length / charsPerFrame) + holdDuration;
  
  // Delete animation
  const deleteSpeed = 0.75; // Delete 3 chars every 4 frames
  const deleteProgress = Math.max(0,
    Math.min(
      (frame - deleteStart) * deleteSpeed,
      firstText.length
    )
  );

  // Second typewriter text: "your foodie friend"
  const secondText = "Your Foodie Friend";
  const secondTypeStart = deleteStart + (firstText.length / deleteSpeed);
  const secondTypeProgress = Math.max(0,
    Math.min(
      (frame - secondTypeStart) * charsPerFrame,
      secondText.length
    )
  );

  // Calculate current text to display
  const currentFirstText = firstText.slice(0, Math.max(0, Math.floor(firstTypeProgress - deleteProgress)));
  const currentSecondText = secondText.slice(0, Math.floor(secondTypeProgress));
  const displayText = frame < secondTypeStart ? currentFirstText : currentSecondText;

  // Cursor blink animation
  const cursorOpacity = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 0, 1]
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
      
      {/* Main text with scale and gradient */}
      <div 
        style={{
          transform: `scale(${scale})`,
          fontSize: '164px',
          fontWeight: 500,
          background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
        }}
      >
        Remy
      </div>

      {/* Typewriter text with cursor */}
      <div 
        style={{
          fontSize: '92px',
          fontWeight: 500,
          color: '#fff',
          height: '110px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>{displayText}</span>
        <span 
          style={{
            opacity: cursorOpacity,
            marginLeft: '4px',
          }}
        >
          |
        </span>
      </div>
    </AbsoluteFill>
  );
};
