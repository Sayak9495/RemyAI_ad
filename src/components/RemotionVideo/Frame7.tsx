import { useCurrentFrame, interpolate } from 'remotion';

export const Frame7 = () => {
  const frame = useCurrentFrame();
  
  // Text animation configuration
  const firstText = "Build a project tracking tool";
  const secondText = "Build a financial dashboard";
  const typingSpeed = 1.5; // frames per character (slightly slower for readability)
  const deleteSpeed = 1.2; // frames per character (slightly slower deletion)
  const pauseDuration = 45; // frames to pause before deleting (longer pause for reading)
  
  // Calculate timing
  const firstTextLength = firstText.length;
  const commonPrefixLength = "Build a".length;
  const charsToDelete = firstTextLength - commonPrefixLength;
  const remainingTextLength = secondText.length - commonPrefixLength;
  
  // Calculate phases
  const typingPhase = Math.min(frame * typingSpeed, firstTextLength);
  const deleteStart = firstTextLength * typingSpeed + pauseDuration;
  const deletePhase = frame > deleteStart / typingSpeed 
    ? Math.min((frame - deleteStart / typingSpeed) * deleteSpeed, charsToDelete)
    : 0;
  const retypingStart = deleteStart + charsToDelete * deleteSpeed;
  const retypingPhase = frame > retypingStart / typingSpeed
    ? Math.min((frame - retypingStart / typingSpeed) * typingSpeed, remainingTextLength)
    : 0;

  // Calculate current text
  let currentText = "";
  if (frame * typingSpeed <= firstTextLength) {
    // Initial typing phase
    currentText = firstText.slice(0, Math.floor(typingPhase));
  } else if (frame > deleteStart / typingSpeed && frame <= retypingStart / typingSpeed) {
    // Delete phase
    currentText = firstText.slice(0, Math.max(commonPrefixLength, firstTextLength - Math.floor(deletePhase)));
  } else if (frame > retypingStart / typingSpeed) {
    // Retyping phase
    currentText = secondText.slice(0, Math.min(commonPrefixLength + Math.floor(retypingPhase), secondText.length));
  } else {
    // Pause phase
    currentText = firstText;
  }

  // Cursor blink animation - smoother
  const cursorOpacity = interpolate(
    frame % 60,
    [0, 25, 35, 60],
    [1, 1, 0.3, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(160deg, #121214 0%, #0a0a10 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{
        position: 'relative',
        padding: '2rem 4rem',
        borderRadius: '100px',
        background: 'linear-gradient(90deg, rgba(110, 159, 255, 0.15), rgba(158, 114, 255, 0.15))',
        border: '2px solid rgba(110, 159, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(110, 159, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <span style={{
          fontSize: '3.5rem',
          fontWeight: 500,
          color: 'white',
          whiteSpace: 'pre',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
        }}>
          {currentText}
        </span>
        <span style={{
          fontSize: '3.5rem',
          fontWeight: 500,
          color: '#6e9fff',
          opacity: cursorOpacity,
          marginLeft: '-0.2rem',
          animation: 'blink 1s infinite',
        }}>
          |
        </span>
        <button style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'white',
          background: 'linear-gradient(90deg, #6e9fff, #9e72ff)',
          border: 'none',
          borderRadius: '50px',
          padding: '0.75rem 2.5rem',
          marginLeft: '2rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(110, 159, 255, 0.4)',
          transition: 'all 0.2s ease',
        }}>
          Build
        </button>
      </div>
    </div>
  );
};
