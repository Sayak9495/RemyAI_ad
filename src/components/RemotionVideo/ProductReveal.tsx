
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
    [0, 0.3, 0.2],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const shadowSize = interpolate(
    bounceScale,
    [0, 0.5, 1],
    [20, 50, 40],
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
        width: '300px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        filter: `blur(${shadowSize / 2}px)`,
        opacity: shadowOpacity,
        transform: `translateY(320px) scale(${productScale})`,
      }} />
      
      {/* Product image */}
      <div style={{
        transform: `translateY(${productY}px) scale(${productScale})`,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        borderRadius: '36px',
        overflow: 'hidden',
        width: '300px',
        height: '600px',
        border: '10px solid #1d1d1f',
        backgroundColor: '#f5f5f7',
      }}>
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
          alt="Product Screenshot" 
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
