import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import './fonts.css';

export const RemyAIFrame9_1 = () => {
  const frame = useCurrentFrame();
  const scaleAnimDuration = 6; // 200ms at 30fps
  const waitDuration = 25; // 500ms at 30fps
  const rotationDuration = 30; // 200ms at 30fps
  
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
  
  // Rotating words animation
  const rotatingWords = ['Movie', 'Meeting', 'Match', 'Netflix', "Partner", "Lecture", "Game"];
  const finalPhrase = 'you can chill';
  
  // Determine which word to show based on current frame
  const getRotatingWord = () => {
    if (frame >= phase2Start + rotationDuration * rotatingWords.length) {
      return null; // Show final phrase
    }
    
    const wordIndex = Math.min(
      Math.floor((frame - phase2Start) / rotationDuration),
      rotatingWords.length - 1
    );
    
    return rotatingWords[wordIndex];
  };
  
  // Rotation animation for words
  const getRotationParams = () => {
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
  const currentRotatingWord = getRotatingWord();
  
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

      {!showPhase2 ? (
        // Phase 1: "So that" with scale animation
        <div style={{ 
          display: 'flex', 
          gap: '30px',
          fontSize: '124px',
          fontWeight: 500,
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
          fontSize: '92px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '68px',
          width: '100%',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '1200px',
            textAlign: 'right',
          }}>
            you can go back to your
          </div>
          
          <div style={{ 
            fontSize: '102px',
            transform: `perspective(800px) rotateY(${rotationParams.rotateY}deg) scale(${rotationParams.scale})`,
            opacity: rotationParams.opacity,
            background: 'linear-gradient(86deg, #527BF0 0.16%, #A791F5 100.16%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            width: '400px',
          }}>
            {currentRotatingWord}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
