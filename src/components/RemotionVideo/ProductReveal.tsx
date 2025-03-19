
import { useCurrentFrame, spring, interpolate } from 'remotion';

export const ProductReveal = () => {
  const frame = useCurrentFrame();
  
  // Product reveal animation
  const dropSpring = spring({
    frame: Math.max(0, frame - 15),
    from: -100,
    to: 0,
    fps: 30,
    config: {
      damping: 12,
      mass: 1.5,
      stiffness: 100,
    },
  });
  
  const productY = interpolate(dropSpring, [-100, 0], [-200, 0], {
    extrapolateRight: 'clamp',
  });
  
  const bounceScale = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    config: { mass: 0.5, stiffness: 150, damping: 8 }
  });
  
  const productScale = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [0.8, 1.1, 1]
  );
  
  const shadowOpacity = interpolate(
    frame,
    [15, 30, 45],
    [0, 0.5, 0.4],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const shadowSize = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [20, 60, 50],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Glow effect on product entry
  const glowOpacity = interpolate(
    frame,
    [15, 45, 75],
    [0, 0.8, 0.3],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Shadow */}
      <div style={{
        position: 'absolute',
        width: '400px', // Larger shadow
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(110, 159, 255, 0.5)', // Blue shadow for premium feel
        filter: `blur(${shadowSize}px)`,
        opacity: shadowOpacity,
        transform: `translateY(380px) scale(${productScale})`,
      }} />
      
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(110, 159, 255, 0.2) 0%, rgba(10, 10, 10, 0) 70%)',
        opacity: glowOpacity,
      }} />
      
      {/* Product image */}
      <div style={{
        transform: `translateY(${productY}px) scale(${productScale})`,
        boxShadow: '0 25px 50px -12px rgba(110, 159, 255, 0.3)',
        overflow: 'hidden',
        width: '380px', // Larger product image
        height: '750px', // Larger product image
        borderRadius: '36px',
        position: 'relative',
      }}>
        <img 
          src="/lovable-uploads/7315d2b0-d74b-4d57-bb8c-12c1d1017094.png" 
          alt="iPhone Pro" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};
