
import { spring, useCurrentFrame, interpolate } from 'remotion';

interface SubtitleTextProps {
  text: string;
  position: 'top' | 'bottom';
  isHeading?: boolean;
}

export const SubtitleText = ({ text, position, isHeading = false }: SubtitleTextProps) => {
  const frame = useCurrentFrame();
  
  const fadeSpring = spring({
    frame: Math.max(0, frame - 5),
    fps: 30,
    config: { mass: 0.5, stiffness: 150, damping: 12 }
  });
  
  const opacity = interpolate(fadeSpring, [0, 1], [0, 1]);
  const xOffset = interpolate(fadeSpring, [0, 1], [20, 0]);
  
  // Position higher above the product or lower below the product
  const positionStyles = position === 'top' 
    ? { top: '5%' } 
    : { bottom: '5%' };

  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      ...positionStyles,
      opacity,
      transform: `translateX(${xOffset}px)`,
      zIndex: 20, // Ensure text is above other elements
    }}>
      <p style={{
        fontSize: isHeading ? '3.5rem' : '2.5rem',
        fontWeight: 700,
        color: '#ffffff',
        margin: 0,
        letterSpacing: '-0.02em',
        textShadow: '0 0 10px rgba(110, 159, 255, 0.6)',
        textTransform: 'uppercase',
      }}>
        {text}
      </p>
    </div>
  );
};
