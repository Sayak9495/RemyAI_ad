import { useCurrentFrame, interpolate, staticFile } from 'remotion';
import './fonts.css';
import { RemyAIFrame72_Confirmation } from './remyAI_Frame72_Confirmation';

export const RemyAIFrame72 = () => {
  const frame = useCurrentFrame();
  
  // Animation timing constants
  const INITIAL_DELAY = 12;  // 200ms at 60fps
  const MOVE_UP_DURATION = 60; // 300ms at 60fps
  const THINKING_DELAY = 30; // 2000ms (2s) at 60fps
  const CART_START_DELAY = 72; // 200ms after thinking

  // Calculate total initial animation time
  const INITIAL_ANIMATIONS = INITIAL_DELAY + MOVE_UP_DURATION + THINKING_DELAY + CART_START_DELAY;

  // Cart animation timings
  const TRANSITION_DURATION = 24; // 400ms for cart transitions
  const DELAY_DURATION = 24; // 400ms delay between carts
  
  // Key animation frames for carts (shifted by initial animations)
  const CART2_START_FRAME = INITIAL_ANIMATIONS + TRANSITION_DURATION;
  const CART3_START_FRAME = CART2_START_FRAME + TRANSITION_DURATION + DELAY_DURATION;
  const CART3_END_FRAME = CART3_START_FRAME + TRANSITION_DURATION;
  
  // Cursor animation timing
  const CURSOR_DELAY = 12; // 200ms delay after cart3 is fully visible
  const CURSOR_START_FRAME = CART3_END_FRAME + CURSOR_DELAY;
  const CURSOR_ANIMATION_DURATION = 36; // 600ms animation duration
  const ORDER_PLACED_START_FRAME = CURSOR_START_FRAME + CURSOR_ANIMATION_DURATION + 20;

  // Button click animation
  const buttonClickProgress = interpolate(
    frame - (CURSOR_START_FRAME + CURSOR_ANIMATION_DURATION * 0.8),
    [0, 6, 12], // 200ms animation
    [1, 0.95, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 2)
    }
  );

  // Search box animations
  const moveUpProgress = interpolate(
    frame - INITIAL_DELAY,
    [0, MOVE_UP_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 1) // Ease out cubic
    }
  );

  // Thinking animation starts after move up
  const showThinking = frame >= (INITIAL_DELAY + MOVE_UP_DURATION);
  const thinkingTextOpacity = interpolate(
    frame - (INITIAL_DELAY + MOVE_UP_DURATION),
    [0, 5, 30, 31],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  const remyTextOpacity = interpolate(
    frame - (INITIAL_DELAY + MOVE_UP_DURATION + 31),
    [0, 6],
    [0, 1],
    { 
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease out for smoother animation
    }
  );

  // Response text appears simultaneously with Remy
  const responseOpacity = interpolate(
    frame - (INITIAL_DELAY + MOVE_UP_DURATION + 31),
    [0, 6],
    [0, 1],
    { 
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Matching easing with Remy text
    }
  );

  // Cart animations - start 3 frames (100ms) after Remy text appears with ease-in
  const cart1Progress = interpolate(
    frame - (INITIAL_DELAY + MOVE_UP_DURATION + 34), // 31 (Remy appears) + 3 frames delay
    [0, 12], // Extending to 12 frames (400ms) for smoother animation
    [0, 1],
    { 
      extrapolateRight: 'clamp',
      easing: (t) => t * t * t // Cubic ease-in for smooth appearance
    }
  );
  
  // Cursor animation
  const showCursor = frame >= CURSOR_START_FRAME;
  const cursorProgress = interpolate(
    frame - CURSOR_START_FRAME,
    [0, CURSOR_ANIMATION_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease-out for smooth movement
    }
  );
  
  // Order placed notification
  const showOrderPlaced = frame >= ORDER_PLACED_START_FRAME;
  const orderPlacedOpacity = interpolate(
    frame - ORDER_PLACED_START_FRAME,
    [0, 8], // 266ms fade-in
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => t * t // Ease-in for smooth fade in
    }
  );

  const cart2Progress = interpolate(
    frame - CART2_START_FRAME,
    [0, TRANSITION_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  const cart3Progress = interpolate(
    frame - CART3_START_FRAME,
    [0, TRANSITION_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  // Cart animations with staggered delays
  const getCartStyle = (index: number) => {
    if (index === 0) {
      // Cart1: Affected by both cart2 and cart3
      const moveUp1 = interpolate(cart2Progress, [0, 1], [0, -6]);
      const moveUp2 = interpolate(cart3Progress, [0, 1], [0, -6]);
      const scale1 = interpolate(cart2Progress, [0, 1], [1, 0.95]);
      const scale2 = interpolate(cart3Progress, [0, 1], [1, 0.95]);
      const opacity1 = interpolate(cart2Progress, [0, 1], [1, 0.8]);
      const opacity2 = interpolate(cart3Progress, [0, 1], [1, 0.8]);
      
      return {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translateY(${moveUp1 + moveUp2}px) scale(${scale1 * scale2})`,
        opacity: opacity1 * opacity2,
        zIndex: 1,
        transformOrigin: 'center top'
      };
    } else if (index === 1) {
      // Cart2: Animates in and affected by cart3
      const translateY = interpolate(cart2Progress, [0, 1], [100, 28]) + 
                        interpolate(cart3Progress, [0, 1], [0, -6]);
      const scale = interpolate(cart3Progress, [0, 1], [1, 0.95]);
      const opacity = cart2Progress * interpolate(cart3Progress, [0, 1], [1, 0.99]);
      
      return {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex: 2,
        transformOrigin: 'center top'
      };
    } else {
      // Cart3: Just animates in
      return {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translateY(${interpolate(cart3Progress, [0, 1], [300, 56])}px)`,
        opacity: cart3Progress,
        zIndex: 3,
        transformOrigin: 'center top',
        // Add a place order button
        '--place-order-scale': buttonClickProgress
      };
    }

    // This should never be reached due to the refactored logic above
    return {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: `translateY(0px)`,
      opacity: 0,
      zIndex: 0,
      transformOrigin: 'center top'
    };
  };

  return (
    <div style={{
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      background: '#09090A',
      fontFamily: 'Inter',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background blur effect
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-90%, -50%)',
        background: 'rgba(112, 147, 247, 0.12)',
        filter: 'blur(110px)',
        borderRadius: '20px',
      }} />
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-10%, -50%)',
        background: 'rgba(167, 145, 245, 0.12)',
        filter: 'blur(110px)',
        borderRadius: '20px',
      }} /> */}
      {/* Search box container */}
      <div style={{
        position: 'absolute',
        top: moveUpProgress === 0 ? '50%' : '7%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        transition: 'top 0.6s ease-out',
        height: '80px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Search box */}
        <div style={{
          display: 'flex',
          width: '790px',
          height: '106px',
          padding: '28px',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: '25px',
          border: '2px solid rgba(225, 231, 240, 0.16)',
          // margin: '0 auto',
          marginLeft: '-30px',
        }}>
          <span style={{
            fontSize: '34px',
            fontWeight: 400,
            color: '#F5F5F7',
            whiteSpace: 'pre',
            letterSpacing: '0',
            width: '100%',
          }}>
            Office lunch under 15 minutes
          </span>
        </div>

        {/* Thinking animation */}
        <div style={{ 
          // marginTop: '10px', 
          width: '790px',
          margin: '20px auto 0',
        }}>
          {showThinking && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                alignSelf: 'flex-start',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14" fill="none">
                  <g style={{
                    animation: remyTextOpacity > 0 ? undefined : 'spin 1s linear infinite',
                    transformOrigin: 'center',
                    fill: 'url(#thinkingGradient)',
                  }}>
                    <path d="M4.66675 5.3335C5.21903 5.3335 5.66675 4.88578 5.66675 4.3335C5.66675 3.78121 5.21903 3.3335 4.66675 3.3335C4.11446 3.3335 3.66675 3.78121 3.66675 4.3335C3.66675 4.88578 4.11446 5.3335 4.66675 5.3335Z"/>
                    <path d="M7.0001 2.66683C7.36829 2.66683 7.66677 2.36835 7.66677 2.00016C7.66677 1.63197 7.36829 1.3335 7.0001 1.3335C6.63191 1.3335 6.33344 1.63197 6.33344 2.00016C6.33344 2.36835 6.63191 2.66683 7.0001 2.66683Z"/>
                    <path d="M7.0001 12.6668C7.36829 12.6668 7.66677 12.3684 7.66677 12.0002C7.66677 11.632 7.36829 11.3335 7.0001 11.3335C6.63191 11.3335 6.33344 11.632 6.33344 12.0002C6.33344 12.3684 6.63191 12.6668 7.0001 12.6668Z"/>
                    <path d="M4.66675 10.667C5.21903 10.667 5.66675 10.2193 5.66675 9.66699C5.66675 9.11471 5.21903 8.66699 4.66675 8.66699C4.11446 8.66699 3.66675 9.11471 3.66675 9.66699C3.66675 10.2193 4.11446 10.667 4.66675 10.667Z"/>
                    <path d="M12.3335 8.33366C13.0698 8.33366 13.6668 7.7367 13.6668 7.00033C13.6668 6.26395 13.0698 5.66699 12.3335 5.66699C11.5971 5.66699 11.0001 6.26395 11.0001 7.00033C11.0001 7.7367 11.5971 8.33366 12.3335 8.33366Z"/>
                    <path d="M7.00008 8.33366C7.73646 8.33366 8.33341 7.7367 8.33341 7.00033C8.33341 6.26395 7.73646 5.66699 7.00008 5.66699C6.2637 5.66699 5.66675 6.26395 5.66675 7.00033C5.66675 7.7367 6.2637 8.33366 7.00008 8.33366Z"/>
                    <path d="M1.66677 8.33366C2.40315 8.33366 3.0001 7.7367 3.0001 7.00033C3.0001 6.26395 2.40315 5.66699 1.66677 5.66699C0.930389 5.66699 0.333435 6.26395 0.333435 7.00033C0.333435 7.7367 0.930389 8.33366 1.66677 8.33366Z"/>
                    <path d="M9.33325 10.667C9.88554 10.667 10.3333 10.2193 10.3333 9.66699C10.3333 9.11471 9.88554 8.66699 9.33325 8.66699C8.78097 8.66699 8.33325 9.11471 8.33325 9.66699C8.33325 10.2193 8.78097 10.667 9.33325 10.667Z"/>
                    <path d="M9.33325 5.3335C9.88554 5.3335 10.3333 4.88578 10.3333 4.3335C10.3333 3.78121 9.88554 3.3335 9.33325 3.3335C8.78097 3.3335 8.33325 3.78121 8.33325 4.3335C8.33325 4.88578 8.78097 5.3335 9.33325 5.3335Z"/>
                  </g>
                  <defs>
                    <linearGradient id="thinkingGradient" x1="0" y1="0" x2="14" y2="14">
                      <stop offset="0%" stopColor="#527BF0" />
                      <stop offset="100%" stopColor="#A791F5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'relative', minWidth: '80px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '20px',
                    color: '#8C919F',
                    fontWeight: 400,
                    opacity: thinkingTextOpacity,
                    position: 'absolute',
                    left: 0,
                    lineHeight: 1,
                  }}>Thinking...</span>
                  <span style={{
                    fontSize: '20px',
                    color: '#8C919F',
                    fontWeight: 400,
                    opacity: remyTextOpacity,
                    position: 'absolute',
                    left: 0,
                    lineHeight: 1,
                  }}>Remy</span>
                </div>
              </div>
              {responseOpacity > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: responseOpacity,
                }}>
                  <span style={{
                    fontSize: '28px',
                    color: '#F5F5F7',
                    fontWeight: 500,
                  }}>Here are few options for office lunch under <span style={{ 
                    background: 'linear-gradient(45deg, #527BF0 0%, #A791F5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>15 minutes</span></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cart Images Container */}
      <div style={{
        position: 'relative',
        width: '790px',
        height: '754px',
        margin: '240px auto 0',
        left: '20%',
        transform: 'translateX(-50%)',
        opacity: cart1Progress,
      }}>
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            style={{
              ...getCartStyle(num - 1),
              cursor: num === 3 ? 'pointer' : 'default',
            }}
          >
            <img
              src={staticFile(`cart${num}.png`)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.2)',
                transform: num === 3 ? `scale(var(--place-order-scale, 1))` : undefined,
                transition: 'transform 0.1s ease-out',
              }}
              alt={`Cart option ${num}`}
            />
          </div>
        ))}
      </div>
      
      {/* Cursor Animation */}
      {showCursor && (
        <div style={{
          position: 'absolute',
          width: '32px',
          height: '38px',
          top: interpolate(cursorProgress, [0, 0.8, 1], [435, 482, 882]),
          left: interpolate(cursorProgress, [0, 0.8, 1], [425, 626, 1166]),
          transform: `scale(${interpolate(cursorProgress, [0.8, 1], [1, 0.85])})`,
          zIndex: 100,
          filter: cursorProgress >= 0.8 ? 'brightness(0.8)' : 'none',
          transition: 'filter 0.1s ease',
        }}>
          <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 0.5L10.5 32.5L15.5 19.5L29.5 16.5L0.5 0.5Z" fill="white" stroke="black"/>
          </svg>
        </div>
      )}
      
      {/* Order Placed Notification */}
      {showOrderPlaced && (
        <RemyAIFrame72_Confirmation />
      )}
    </div>
  );
};
