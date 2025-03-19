
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

  // Enhanced cloud effect animations - more dramatic "heaven" effect
  const cloudScale = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    config: { mass: 0.7, stiffness: 75, damping: 12 }  // Adjusted for smoother expansion
  });
  
  const cloudOpacity = interpolate(
    frame,
    [30, 40, 90],  // Extended duration for longer lasting effect
    [0, 0.9, 0],
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

  // Create more dramatic, smoother cloud particles for the "unveiled from heaven" effect
  const renderClouds = () => {
    const cloudCount = 18;  // More clouds for more dramatic effect
    const clouds = [];
    
    for (let i = 0; i < cloudCount; i++) {
      const angle = (i / cloudCount) * Math.PI * 2;
      // More dramatic distance range for cloud particles
      const distance = interpolate(cloudScale, [0, 1], [0, 250 + Math.random() * 180]);
      const size = 60 + Math.random() * 120;  // Larger clouds for more dramatic effect
      const xPos = Math.cos(angle) * distance;
      // Flattened ellipse for more realistic fog/cloud effect at bottom
      const yPos = 380 + Math.sin(angle) * (distance / 3);
      const delay = i * 1.8;  // Staggered delays for smoother appearance
      
      // More sophisticated opacity animation
      const individualCloudOpacity = interpolate(
        frame,
        [30 + delay, 40 + delay, 80 + delay],
        [0, 0.8 * (1 - i / cloudCount * 0.4), 0],  // Higher maximum opacity
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );
      
      // Subtle cloud movement for more dynamic effect
      const cloudMovement = interpolate(
        frame,
        [30 + delay, 80 + delay],
        [0, i % 2 === 0 ? 15 : -15],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );
      
      clouds.push(
        <div key={i} style={{
          position: 'absolute',
          width: size,
          height: size / 1.8,  // More elliptical clouds for fog effect
          borderRadius: '50%',
          background: i % 3 === 0 
            ? 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 70%)'
            : 'rgba(255, 255, 255, 0.85)',  // Varying cloud appearances
          filter: 'blur(18px)',  // Increased blur for softer fog effect
          opacity: individualCloudOpacity,
          transform: `translate(${xPos + cloudMovement}px, ${yPos}px)`,
          zIndex: 10,
        }} />
      );
    }
    
    // Add a few additional fog elements at the bottom for the "unveiling" effect
    for (let i = 0; i < 5; i++) {
      const fogWidth = 200 + Math.random() * 300;
      const xPos = -400 + i * 200;
      const delay = i * 3;
      
      const fogOpacity = interpolate(
        frame,
        [35 + delay, 50 + delay, 90 + delay],
        [0, 0.7, 0],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );
      
      const fogRise = interpolate(
        frame,
        [35 + delay, 90 + delay],
        [410, 370],  // Rising effect
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );
      
      clouds.push(
        <div key={`fog-${i}`} style={{
          position: 'absolute',
          width: fogWidth,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          filter: 'blur(25px)',  // Extra blurry for fog effect
          opacity: fogOpacity,
          transform: `translate(${xPos}px, ${fogRise}px)`,
          zIndex: 11,  // Above other clouds
        }} />
      );
    }
    
    return clouds;
  };

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
      
      {/* Enhanced cloud impact effect */}
      {renderClouds()}
      
      {/* Improved center glow effect */}
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '70px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 70%)',
        filter: 'blur(18px)',
        opacity: cloudOpacity,
        transform: 'translateY(380px)',
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
      
      {/* Product image with enhanced positioning */}
      <div style={{
        transform: `translateY(${productY}px) scale(${productScale})`,
        boxShadow: '0 25px 50px -12px rgba(110, 159, 255, 0.35)',
        overflow: 'hidden',
        width: '480px', // Even larger product image
        height: '960px', // Even larger product image
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
