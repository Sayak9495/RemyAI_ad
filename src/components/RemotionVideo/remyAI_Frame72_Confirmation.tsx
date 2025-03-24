import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame72_Confirmation = () => {
  const frame = useCurrentFrame();
  
  // Animation timing
  const FADE_DURATION = 10; // ~333ms at 30fps
  
  const opacity = interpolate(
    frame,
    [0, FADE_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => t * t // Ease-in for smooth fade
    }
  );

  const scale = interpolate(
    frame,
    [0, FADE_DURATION],
    [0.9, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease-out for bounce effect
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      opacity,
      transform: `scale(${scale})`,
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

      {/* Checkmark circle */}
      <div style={{
        // width: '64px',
        // height: '64px',
        borderRadius: '50%',
        // background: 'linear-gradient(45deg, #527BF0 0%, #A791F5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
       <svg width="267" height="267" viewBox="0 0 267 267" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_13189_6593)">
        <path d="M91.667 141.666L116.667 166.666L175 108.333" stroke="url(#paint0_linear_13189_6593)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M133.333 233.333C188.562 233.333 233.333 188.561 233.333 133.333C233.333 78.1045 188.562 33.333 133.333 33.333C78.105 33.333 33.3335 78.1045 33.3335 133.333C33.3335 188.561 78.105 233.333 133.333 233.333Z" stroke="url(#paint1_linear_13189_6593)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <linearGradient id="paint0_linear_13189_6593" x1="133.334" y1="108.333" x2="133.334" y2="166.666" gradientUnits="userSpaceOnUse">
        <stop stop-color="#A791F5"/>
        <stop offset="1" stop-color="#527BF0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_13189_6593" x1="133.333" y1="33.333" x2="133.333" y2="233.333" gradientUnits="userSpaceOnUse">
        <stop stop-color="#A791F5"/>
        <stop offset="1" stop-color="#527BF0"/>
        </linearGradient>
        <clipPath id="clip0_13189_6593">
        <rect width="266.667" height="266.667" fill="white"/>
        </clipPath>
        </defs>
        </svg>

      </div>

      {/* Confirmation text */}
      <span style={{
        fontSize: '80px',
        fontWeight: 500,
        color: '#F5F5F7',
        textAlign: 'center',
      }}>
        Order confirmed
      </span>
    </div>
  );
}; 