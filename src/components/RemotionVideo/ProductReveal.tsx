
import { useCurrentFrame, spring, interpolate } from 'remotion';

export const ProductReveal = () => {
  const frame = useCurrentFrame();
  
  // Product reveal animation - smoother entry with better spring physics
  const dropSpring = spring({
    frame: Math.max(0, frame - 15),
    from: -100,
    to: 0,
    fps: 30,
    config: {
      damping: 14,      // Increased for smoother motion
      mass: 1.2,         // Adjusted for more natural weight
      stiffness: 90,     // Reduced for more elegant motion
    },
  });
  
  const productY = interpolate(dropSpring, [-100, 0], [-200, 0], {
    extrapolateRight: 'clamp',
  });
  
  // Enhanced bounce animation with smoother transitions
  const bounceScale = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    config: { mass: 0.6, stiffness: 120, damping: 10 }  // Adjusted for premium feel
  });
  
  const productScale = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [0.85, 1.08, 1]  // More subtle scaling for elegance
  );
  
  // Improved shadow/ground effect animation
  const shadowOpacity = interpolate(
    frame,
    [15, 30, 45],
    [0, 0.6, 0.45],  // Enhanced shadow intensity
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const shadowSize = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [20, 70, 55],  // Larger, more dramatic shadow
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Enhanced glow effect for more premium look
  const glowOpacity = interpolate(
    frame,
    [15, 45, 85],  // Extended glow duration
    [0, 0.9, 0.35],  // More intense glow
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
      zIndex: 10,
    }}>
      {/* Enhanced shadow with better color and glow */}
      <div style={{
        position: 'absolute',
        width: '450px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(110, 159, 255, 0.5)',
        filter: `blur(${shadowSize}px)`,
        opacity: shadowOpacity,
        transform: `translateY(380px) scale(${productScale})`,
        zIndex: 5,
      }} />
      
      {/* Enhanced glow effect with more vibrant color */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(110, 159, 255, 0.25) 0%, rgba(10, 10, 10, 0) 70%)',
        opacity: glowOpacity,
        zIndex: 5,
      }} />
      
      {/* Product image with enhanced positioning - now smaller */}
      <div style={{
        transform: `translateY(${productY}px) scale(${productScale})`,
        boxShadow: '0 25px 50px -12px rgba(110, 159, 255, 0.35)',
        overflow: 'hidden',
        width: '420px', // Reduced from 480px
        height: '840px', // Reduced from 960px
        borderRadius: '42px', // Slightly more rounded corners
        position: 'relative',
        zIndex: 15,
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
