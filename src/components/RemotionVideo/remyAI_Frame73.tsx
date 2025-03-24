import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame73 = () => {
  const frame = useCurrentFrame();
  
  // 1.3 seconds = 39 frames at 30fps
  const TYPING_DURATION = 30;
  
  // Split the text into parts
  const textPart1 = "Remy can do ";
  const textPart2 = "more";
  const fullText = textPart1 + textPart2;
  
  // Calculate how many characters to show
  const progress = interpolate(
    frame,
    [0, TYPING_DURATION],
    [0, fullText.length],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp'
    }
  );
  
  const currentProgress = Math.floor(progress);
  
  // Determine what parts of the text are visible
  const showPart1 = currentProgress > 0 ? textPart1.slice(0, Math.min(currentProgress, textPart1.length)) : '';
  const showPart2 = currentProgress > textPart1.length ? textPart2.slice(0, currentProgress - textPart1.length) : '';
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#09090A',
      fontFamily: 'Inter',
    }}>
      <div style={{
        fontSize: '160px',
        fontWeight: 600,
        position: 'relative',
        // display: 'flex',
        gap: '38px',
        // marginLeft: '-80px',
      }}>
        {/* Regular text part */}
        <span style ={{ color: '#F5F5F7' }}>
          {showPart1}
        </span>
        
        {/* Gradient text part */}
        <span style={{
          background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {showPart2}
        </span>
        
        {/* Blinking cursor */}
        <span 
          style={{
            opacity: frame % 30 < 15 ? 1 : 0, // Blink cursor every 500ms
            // marginLeft: '2px',
            color: '#527BF0',
          }}
        >|</span>
      </div>
    </div>
  );
};
