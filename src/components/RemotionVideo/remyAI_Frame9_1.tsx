import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame9_1 = () => {
  const frame = useCurrentFrame();
  const scaleAnimDuration = 24; // 400ms at 60fps
  const waitDuration = 50; // 500ms at 60fps
  const rotationDuration = 60; // 200ms at 60fps
  const TYPING_DURATION = 22; // 200ms at 60fps
  
  // Initial animation timing
  const firstWordScale = interpolate(
    frame,
    [0, scaleAnimDuration],
    [1.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const secondWordScale = interpolate(
    frame,
    [scaleAnimDuration, scaleAnimDuration * 2],
    [1.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const secondWordOpacity = interpolate(
    frame,
    [scaleAnimDuration - 3, scaleAnimDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Phase 2 animation - starts after wait period
  const phase2Start = scaleAnimDuration * 2 + waitDuration;
  const showPhase2 = frame >= phase2Start;
  
  // Animation for the static text
  const staticTextOpacity = interpolate(
    frame - phase2Start,
    [0, 30], // 500ms at 60fps
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out
    }
  );

  const staticTextY = interpolate(
    frame - phase2Start,
    [0, 30], // 500ms at 60fps
    [20, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out
    }
  );
  
  // Rotating words animation
  const rotatingWords = ['Movie', 'Meeting', 'Match', 'Netflix', "Partner", "Game"];
  const finalPhrase = 'you can chill';
  
  // Determine which word to show based on current frame
  const getRotatingWord = () => {
    const lastWordFrame = phase2Start + rotationDuration * rotatingWords.length;
    if (frame >= lastWordFrame) {
      return rotatingWords[rotatingWords.length - 1]; // Return last word and hold it
    }
    
    const wordIndex = Math.min(
      Math.floor((frame - phase2Start) / rotationDuration),
      rotatingWords.length - 1
    );
    
    return rotatingWords[wordIndex];
  };
  
  // Typewriter animation for the current word
  const getTypewriterText = () => {
    const currentWord = getRotatingWord();
    if (!currentWord) return null;
    
    const lastWordFrame = phase2Start + rotationDuration * rotatingWords.length;
    if (frame >= lastWordFrame) {
      return currentWord; // Return full word without typing animation
    }
    
    const wordStartFrame = phase2Start + Math.floor((frame - phase2Start) / rotationDuration) * rotationDuration;
    const typingProgress = interpolate(
      frame - wordStartFrame,
      [0, TYPING_DURATION],
      [0, currentWord.length],
      { extrapolateRight: 'clamp' }
    );
    
    return currentWord.slice(0, Math.floor(typingProgress));
  };
  
  // Rotation animation for words
  const getRotationParams = () => {
    const lastWordFrame = phase2Start + rotationDuration * rotatingWords.length;
    if (frame >= lastWordFrame) {
      return { rotateY: 0, scale: 1, opacity: 1, currentIndex: rotatingWords.length - 1 }; // Hold last word steady
    }
    
    const currentIndex = Math.min(
      Math.floor((frame - phase2Start) / rotationDuration),
      rotatingWords.length
    );
    
    const progress = ((frame - phase2Start) % rotationDuration) / rotationDuration;
    
    // Animation values for the current rotating word
    const rotateY = interpolate(progress, [0, 0.5, 1], [0, 15, 0]);
    const scale = interpolate(progress, [0, 0.5, 1], [1, 1.1, 1]);
    const opacity = interpolate(progress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    
    return { rotateY, scale, opacity, currentIndex };
  };
  
  // Get animation values for final phrase
  const getFinalPhraseParams = () => {
    const startFrame = phase2Start + rotationDuration * rotatingWords.length;
    const progress = interpolate(
      frame,
      [startFrame, startFrame + rotationDuration],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
    
    const opacity = interpolate(progress, [0, 0.5], [0, 1]);
    const scale = interpolate(progress, [0, 0.5, 1], [0.9, 1.05, 1]);
    
    return { opacity, scale };
  };
  
  const rotationParams = getRotationParams();
  const finalParams = getFinalPhraseParams();
  const typewriterText = getTypewriterText();
  
  return (
    <AbsoluteFill
      style={{
        background: '#09090A',
        fontFamily: 'Inter',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      {!showPhase2 ? (
        // Phase 1: "So that" with scale animation
        <div style={{ 
          display: 'flex', 
          gap: '62px',
          fontSize: '160px',
          fontWeight: 600,
        }}>
          <div style={{ 
            transform: `scale(${firstWordScale})`,
          }}>
            So
          </div>
          <div style={{ 
            transform: `scale(${secondWordScale})`,
            opacity: secondWordOpacity,
          }}>
            that
          </div>
        </div>
      ) : (
        // Phase 2: Rotating text animation
        <div style={{ 
          fontSize: '110px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // gap: '10px',
          }}>
            <div style={{
              // background: 'red',
              width: '1350px',
              opacity: staticTextOpacity,
              transform: `translateY(${staticTextY}px)`,
            }}>
              You can go back to your
            </div>
            <div style={{ 
              width: '450px',
              textAlign: 'left',
              fontSize: '110px',
              opacity: rotationParams.opacity,
              background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}>
              {typewriterText}
              <span 
                style={{
                  opacity: frame % 60 < 30 ? 1 : 0,
                  // marginLeft: '0.5px',
                  background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >|</span>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
