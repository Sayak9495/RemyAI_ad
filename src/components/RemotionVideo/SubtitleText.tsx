
import { spring, useCurrentFrame, interpolate } from 'remotion';

interface SubtitleTextProps {
  text: string;
  position: 'top' | 'bottom';
  isHeading?: boolean;
  delay?: number;
}

export const SubtitleText = ({ 
  text, 
  position, 
  isHeading = false,
  delay = 0 
}: SubtitleTextProps) => {
  const frame = useCurrentFrame();
  
  // Enhanced fade spring with delay parameter for staggered animations
  const fadeSpring = spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: { mass: 0.45, stiffness: 120, damping: 14 } // Adjusted for smoother motion
  });
  
  const opacity = interpolate(fadeSpring, [0, 1], [0, 1]);
  
  // Enhanced x-offset with more dramatic initial position
  const xOffset = interpolate(fadeSpring, [0, 1], [50, 0]);
  
  // Enhanced y-offset for vertical movement
  const yOffset = interpolate(fadeSpring, [0, 1], [20, 0]);
  
  // Position higher above the product or lower below the product
  // Improved positioning to avoid overlap with product
  const positionStyles = position === 'top' 
    ? { top: '8%' }  // Higher placement for top text
    : { bottom: '8%' }; // Lower placement for bottom text
  
  // Determine font size based on isHeading, with larger sizes
  const fontSize = isHeading 
    ? '4.2rem'  // Larger heading
    : '2.8rem'; // Larger subtitle

  // Add gradient color for top heading ("with twitterAI")
  const textStyle = {
    fontSize,
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
    textShadow: '0 0 15px rgba(110, 159, 255, 0.7), 0 0 30px rgba(0, 0, 0, 0.3)',
    textTransform: 'uppercase',
    lineHeight: 1.1,
    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
  };

  // Special styling for "with twitterAI" text
  if (position === 'top' && isHeading) {
    return (
      <div style={{ 
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        ...positionStyles,
        opacity,
        transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
        zIndex: 30, // Ensure text is above all other elements
      }}>
        <p style={{
          ...textStyle,
          // Gradient text color for the top heading
          background: 'linear-gradient(to right, #6e9fff, #9e72ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent', // Fallback
        }}>
          {text}
        </p>
      </div>
    );
  }

  // Standard white text for other subtitle text
  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      ...positionStyles,
      opacity,
      transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
      zIndex: 30, // Ensure text is above all other elements
    }}>
      <p style={{
        ...textStyle,
        color: '#ffffff', // Standard white for bottom text
      }}>
        {text}
      </p>
    </div>
  );
};
