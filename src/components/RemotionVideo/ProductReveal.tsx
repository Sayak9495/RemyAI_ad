
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
  
  // Shadow/ground effect animation
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

  // Cloud effect animations
  const cloudScale = spring({
    frame: Math.max(0, frame - 30),
    fps: 30,
    config: { mass: 0.8, stiffness: 80, damping: 10 }
  });
  
  const cloudOpacity = interpolate(
    frame,
    [30, 40, 80],
    [0, 0.8, 0],
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

  // Create multiple cloud particles
  const renderClouds = () => {
    const cloudCount = 12;
    const clouds = [];
    
    for (let i = 0; i < cloudCount; i++) {
      const angle = (i / cloudCount) * Math.PI * 2;
      const distance = interpolate(cloudScale, [0, 1], [0, 200 + Math.random() * 150]);
      const size = 50 + Math.random() * 100;
      const xPos = Math.cos(angle) * distance;
      const yPos = 380 + Math.sin(angle) * (distance / 2); // Flattened ellipse
      const delay = i * 2;
      
      const individualCloudOpacity = interpolate(
        frame,
        [30 + delay, 40 + delay, 80 + delay],
        [0, 0.7 * (1 - i / cloudCount * 0.5), 0],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );
      
      clouds.push(
        <div key={i} style={{
          position: 'absolute',
          width: size,
          height: size / 2,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          filter: 'blur(15px)',
          opacity: individualCloudOpacity,
          transform: `translate(${xPos}px, ${yPos}px)`,
          zIndex: 10,
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
      {/* Shadow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(110, 159, 255, 0.5)',
        filter: `blur(${shadowSize}px)`,
        opacity: shadowOpacity,
        transform: `translateY(380px) scale(${productScale})`,
        zIndex: 5,
      }} />
      
      {/* Cloud impact effect */}
      {renderClouds()}
      
      {/* Center glow effect */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        filter: 'blur(20px)',
        opacity: cloudOpacity,
        transform: 'translateY(380px)',
        zIndex: 5,
      }} />
      
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(110, 159, 255, 0.2) 0%, rgba(10, 10, 10, 0) 70%)',
        opacity: glowOpacity,
        zIndex: 5,
      }} />
      
      {/* Product image */}
      <div style={{
        transform: `translateY(${productY}px) scale(${productScale})`,
        boxShadow: '0 25px 50px -12px rgba(110, 159, 255, 0.3)',
        overflow: 'hidden',
        width: '400px', // Larger product image
        height: '800px', // Larger product image
        borderRadius: '36px',
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
