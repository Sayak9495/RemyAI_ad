import { useCurrentFrame, spring, interpolate, staticFile } from 'remotion';

export const ProductReveal = () => {
  const frame = useCurrentFrame();
  
  // Title animation
  const titleSpring = spring({
    frame: Math.max(0, frame),
    from: 0,
    to: 1,
    fps: 30,
    config: { mass: 0.5, stiffness: 100, damping: 12 }
  });
  
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [-20, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.9, 1]);

  // Initial product opacity
  const initialProductOpacity = interpolate(
    frame,
    [0, 15],
    [0, 0],
    { extrapolateRight: 'clamp' }
  );
  
  // Product reveal animation - starts 15 frames (0.5 sec) after title
  const dropSpring = spring({
    frame: Math.max(0, frame - 15),
    from: -100,
    to: 0,
    fps: 30,
    config: {
      damping: 14,
      mass: 1.2,
      stiffness: 90,
    },
  });
  
  const productY = interpolate(dropSpring, [-100, 0], [-200, 50], {
    extrapolateRight: 'clamp',
  });
  
  // Product opacity after title - no fade out
  const productOpacity = interpolate(
    frame - 15,
    [0, 5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  // Geometry animation - synchronize with product - no fade out
  const geometryOpacity = interpolate(
    frame - 15,
    [0, 5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Bounce animation
  const bounceScale = spring({
    frame: Math.max(0, frame - 21),
    fps: 30,
    config: { mass: 0.6, stiffness: 120, damping: 10 }
  });
  
  const productScale = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [0.85, 1.08, 1]
  ) * 0.8; // Scale down to 80%
  
  // Shadow animation - no fade out
  const shadowOpacity = interpolate(
    frame,
    [15, 21],
    [0, 0.6],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const shadowSize = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [20, 70, 55],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Glow effect - no fade out
  const glowOpacity = interpolate(
    frame,
    [15, 26],
    [0, 0.9],
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
      background: 'linear-gradient(160deg, #121214 0%, #0a0a10 100%)',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'hidden',
    }}>
      {/* Title with gradient */}
      <div style={{
        position: 'absolute',
        top: '5%',
        width: '100%',
        textAlign: 'center',
        opacity: titleOpacity,
        transform: `translateY(${titleY}px) scale(${titleScale})`,
      }}>
        <h1 style={{
          fontSize: '6rem',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '0.0em',
          // textTransform: 'uppercase',
          background: 'linear-gradient(to right, #6e9fff, #9e72ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 15px rgba(110, 159, 255, 0.4)',
        }}>
          With samosaa.ai
        </h1>
      </div>
      
      {/* Abstract Geometries */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'spin 10s linear infinite',
        opacity: geometryOpacity,
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '15%',
        width: '30px',
        height: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'spin 15s linear infinite reverse',
        opacity: geometryOpacity,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '20%',
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'spin 12s linear infinite',
        opacity: geometryOpacity,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '35px',
        height: '35px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'spin 18s linear infinite reverse',
        opacity: geometryOpacity,
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '25px',
        height: '25px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'spin 20s linear infinite',
        opacity: geometryOpacity,
      }} />
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* Product container */}
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
          width: '450px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(110, 159, 255, 0.5)',
          filter: `blur(${shadowSize}px)`,
          opacity: shadowOpacity,
          transform: `translateY(380px) scale(${productScale})`,
          zIndex: 5,
        }} />
        
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(110, 159, 255, 0.25) 0%, rgba(10, 10, 10, 0) 70%)',
          opacity: glowOpacity,
          zIndex: 5,
        }} />
        
        {/* Product image */}
        <div style={{
          transform: `translateY(${productY}px) scale(${productScale})`,
          // boxShadow: '0 25px 50px -12px rgba(110, 159, 255, 0.35)',
          overflow: 'hidden',
          width: '440px',
          height: '895px',
          borderRadius: '42px',
          position: 'relative',
          zIndex: 15,
          opacity: productOpacity,
        }}>
          <img 
            src={staticFile('samosaa2.png')}
            alt="Product Screenshot" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
};
