import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame8 = () => {
  const frame = useCurrentFrame();
  
  // Animation timing constants (in frames at 30fps)
  const CLICK_START = 30; // When the click animation starts
  const CLICK_DURATION = 15; // Duration of click animation
  const INITIAL_DELAY = CLICK_START + CLICK_DURATION + 15; // Start moving down after click
  const MOVE_DOWN_DURATION = 12; // 400ms
  const TYPING_DURATION_PART1 = 50; // First part typing duration
  const TYPING_DURATION_PART2 = 40; // Second part typing duration
  
  // Click animation
  const clickScale = interpolate(
    frame - CLICK_START,
    [0, CLICK_DURATION * 0.3, CLICK_DURATION],
    [1, 0.92, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => {
        // Custom easing for more natural click feel
        if (t < 0.3) return 1 - Math.pow(1 - t/0.3, 2); // Quick contract
        return 1 - Math.pow(1 - ((t-0.3)/0.7), 3); // Slower expand
      }
    }
  );

  // Circle movement animation
  const circleY = interpolate(
    frame - INITIAL_DELAY,
    [0, MOVE_DOWN_DURATION],
    [540, 800],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease-out
    }
  );
  
  // Circle scale animation during movement
  const moveScale = interpolate(
    frame - INITIAL_DELAY,
    [0, MOVE_DOWN_DURATION],
    [1, 0.53],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Same easing as movement
    }
  );

  // Combine click and move scales
  const finalScale = frame < INITIAL_DELAY ? clickScale : clickScale * moveScale;
  
  // Text typing animation with pause
  const textPart1 = "Hey, I am craving ";
  const textPart2 = "some burger and coke under ₹300";
  const PAUSE_DURATION = 22; // 1 second pause at 30fps

  const typingProgress = frame - INITIAL_DELAY - MOVE_DOWN_DURATION;
  let visibleText = '';

  if (typingProgress <= 0) {
    visibleText = '';
  } else if (typingProgress <= TYPING_DURATION_PART1) {
    // First part typing
    const progress = interpolate(
      typingProgress,
      [0, TYPING_DURATION_PART1],
      [0, textPart1.length],
      { extrapolateRight: 'clamp' }
    );
    visibleText = textPart1.slice(0, Math.floor(progress));
  } else if (typingProgress <= TYPING_DURATION_PART1 + PAUSE_DURATION) {
    // Pause after first part
    visibleText = textPart1;
  } else {
    // Second part typing
    const progress = interpolate(
      typingProgress - TYPING_DURATION_PART1 - PAUSE_DURATION,
      [0, TYPING_DURATION_PART2],
      [0, textPart2.length],
      { extrapolateRight: 'clamp' }
    );
    visibleText = textPart1 + textPart2.slice(0, Math.floor(progress));
  }
  
  // Wave animation for the bars
  const getBarHeight = (index: number) => {
    const baseHeight = 50;
    const amplitude = 20;
    const frequency = 0.12;
    const phaseShift = index * (Math.PI / 2); // Offset each bar's animation
    
    return baseHeight + amplitude * Math.sin(frame * frequency + phaseShift);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#09090A',
      fontFamily: 'Inter',
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
      
      {/* Text at the top */}
      <div style={{
        width: '1180px',
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#F5F5F7',
        fontSize: '106px',
        fontWeight: 500,
        // whiteSpace: 'nowrap',
        textAlign: 'center',
        lineHeight: '130%',
      }}>
        {visibleText}
        <span 
          style={{
            opacity: frame % 30 < 15 ? 1 : 0, // Blink cursor every 500ms
            marginLeft: '2px',
          }}
        ></span>
      </div>
      
      {/* Assistant Circle */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '-10%',
        transform: `translate(-50%, ${circleY}px) scale(${finalScale})`,
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, #527BF0 0%, #A791F5 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'transform 0.2s ease-out',
      }}>
        {/* Animated Bars */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: '10px',
              height: `${getBarHeight(i)}px`,
              background: '#1F1F1F',
              borderRadius: '5px',
              transition: 'height 0.1s ease',
            }}
          />
        ))}
      </div>
      </div>
  );
};
