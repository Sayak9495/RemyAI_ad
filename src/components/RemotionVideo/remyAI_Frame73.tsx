import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame73 = () => {
  const frame = useCurrentFrame();
  
  // 1.3 seconds = 78 frames at 60fps
  const TYPING_DURATION = 60;
  
  // Text typing animation
  const textPart1 = "Remy can do ";
  const textPart2 = "more";
  const fullText = textPart1 + textPart2;
  
  const progress = interpolate(
    frame,
    [0, TYPING_DURATION],
    [0, fullText.length],
    { extrapolateRight: 'clamp' }
  );
  
  const currentProgress = Math.floor(progress);
  
  // Determine what parts of the text are visible
  const showPart1 = currentProgress > 0 ? textPart1.slice(0, Math.min(currentProgress, textPart1.length)) : '';
  const showPart2 = currentProgress > textPart1.length ? textPart2.slice(0, currentProgress - textPart1.length) : '';
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#09090A',
      fontFamily: 'Inter',
    }}>
  
      {/* Text at the top */}
      <div style={{
        width: '1880px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '160px',
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: '130%',
      }}>
        <span style={{ color: '#F5F5F7' }}>{showPart1}</span>
        <span style={{
          background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>{showPart2}</span>
        <span 
          style={{
            opacity: frame % 60 < 30 ? 1 : 0, // Blink cursor every 500ms
            marginLeft: '2px',
            color: '#F5F5F7',
          }}
        >|</span>
      </div>
    </div>
  );
};
