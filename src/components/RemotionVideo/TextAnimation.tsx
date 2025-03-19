
import { spring, useCurrentFrame, interpolate } from 'remotion';
import { useState, useEffect } from 'react';

export const TextAnimation = () => {
  const frame = useCurrentFrame();
  
  // Main title animation
  const titleOpacity = interpolate(
    frame,
    [0, 15, 135, 150],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const titleY = interpolate(
    frame,
    [0, 20],
    [50, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // "Smarter" animation
  const smarterSpring = spring({
    frame: Math.max(0, frame - 40),
    from: 0,
    to: 1,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });
  
  const smarterScale = interpolate(smarterSpring, [0, 1], [0.8, 1]);
  const smarterRotate = interpolate(smarterSpring, [0, 1], [10, 0]);

  // "Faster" animation
  const fasterSpring = spring({
    frame: Math.max(0, frame - 70),
    from: 0,
    to: 1,
    fps: 30,
    config: {
      damping: 10,
      stiffness: 200,
    },
  });
  
  const fasterX = interpolate(fasterSpring, [0, 1], [100, 0]);
  const fasterBlur = interpolate(fasterSpring, [0, 1], [10, 0]);

  return (
    <div style={{ 
      opacity: titleOpacity,
      transform: `translateY(${titleY}px)`,
      textAlign: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1 style={{ 
        fontSize: '6.5rem', // Larger text
        fontWeight: 700,
        letterSpacing: '-0.03em',
        margin: 0,
        color: '#ffffff', // White text for dark theme
        textShadow: '0 0 15px rgba(255, 255, 255, 0.3)', // Premium glow effect
      }}>
        Order Food,
      </h1>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2.5rem',
        marginTop: '0.5rem',
      }}>
        <span style={{ 
          fontSize: '6.5rem', // Larger text
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#6e9fff', // Premium blue color
          transform: `scale(${smarterScale}) rotate(${smarterRotate}deg)`,
          display: 'inline-block',
          transformOrigin: 'center',
          textShadow: '0 0 20px rgba(110, 159, 255, 0.6)', // Premium glow effect
        }}>
          Smarter
        </span>
        
        <span style={{ 
          fontSize: '6.5rem', // Larger text
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#6e9fff', // Premium blue color
          transform: `translateX(${fasterX}px)`,
          filter: `blur(${fasterBlur}px)`,
          display: 'inline-block',
          textShadow: '0 0 20px rgba(110, 159, 255, 0.6)', // Premium glow effect
        }}>
          Faster
        </span>
      </div>
    </div>
  );
};
