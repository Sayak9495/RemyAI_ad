
import { spring, useCurrentFrame, interpolate } from 'remotion';

interface SubtitleTextProps {
  text: string;
  position: 'top' | 'bottom';
}

export const SubtitleText = ({ text, position }: SubtitleTextProps) => {
  const frame = useCurrentFrame();
  
  const fadeSpring = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    config: { mass: 0.5, stiffness: 150, damping: 12 }
  });
  
  const opacity = interpolate(fadeSpring, [0, 1], [0, 1]);
  const xOffset = interpolate(fadeSpring, [0, 1], [20, 0]);
  
  const positionStyles = position === 'top' 
    ? { top: '15%' } 
    : { bottom: '15%' };

  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      ...positionStyles,
      opacity,
      transform: `translateX(${xOffset}px)`,
    }}>
      <p style={{
        fontSize: '2.5rem', // Larger text
        fontWeight: 700, // Bold text
        color: '#ffffff', // White text for dark theme
        margin: 0,
        letterSpacing: '-0.02em',
        textShadow: '0 0 10px rgba(110, 159, 255, 0.4)', // Premium glow effect
        textTransform: 'uppercase', // Uppercase for more premium feel
      }}>
        {text}
      </p>
    </div>
  );
};
