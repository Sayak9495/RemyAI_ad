import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { WaveCircle } from './WaveCircle';
import './fonts.css';

export const RemyAIFrame8_2 = () => {
  const frame = useCurrentFrame();
  const messagePart1 = "Aren't you on a diet?";
  const messagePart2 = "Here are some guiltfree burgers instead!";
  const messageCharsPerFrame = 1; // Characters per frame for typing
  const delayFrames = 38; // 200ms delay at 30fps
  
  // Calculate durations
  const part1Duration = Math.ceil(messagePart1.length / messageCharsPerFrame);
  const part2Duration = Math.ceil(messagePart2.length / messageCharsPerFrame+30);
  const totalDuration = part1Duration + delayFrames + part2Duration;
  
  // Animation timing constants
  const typingStartFrame = 25; // Start typing almost immediately
  const speakingEndFrame = 125
  const animationDuration = 125; // 1.5 seconds at 30fps
  const cyclesPerSecond = 3.0;
  
  // RGB values for color interpolation
  const baseColorRGB = { r: 124, g: 129, b: 145 };
  const highlightColorRGB = { r: 185, g: 188, b: 199 };
  
  const displayText = frame < speakingEndFrame ? "Speaking" : "Remy";

  // Calculate typing progress for part 1
  const part1Progress = interpolate(
    frame - typingStartFrame,
    [0, messagePart1.length / 0.7],
    [0, messagePart1.length],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Calculate typing progress for part 2
  const part2Progress = interpolate(
    frame - (typingStartFrame + part1Duration + delayFrames),
    [0, messagePart2.length / 0.3], // Reduced from 1 to 0.6 to slow down typing
    [0, messagePart2.length],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Calculate cart animations - start after message is fully typed
  const cartStartFrame = typingStartFrame + totalDuration + 85; // Start 1.17s after message completes (increased by 500ms)
  const cartOpacity = interpolate(
    frame - cartStartFrame,
    [0, 20], // Smooth fade in
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: '#09090A',
        fontFamily: 'Inter',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
      }}
    >
      {/* Background blur rectangles
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
      {/* Top section with assistant and message */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '800px',
        margin: '30px auto',
        width: '100%',
      }}>
        {/* Assistant circle and speaking text */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            backgroundColor: '#7C8191',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>
            <WaveCircle size={42} />
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '2px',
            fontSize: '8rem',
          }}>
            {frame < speakingEndFrame ? (
              // Animated "Speaking" text
              displayText.split('').map((char, index) => {
                const progress = interpolate(
                  (frame * cyclesPerSecond) % animationDuration,
                  [
                    (index * animationDuration) / displayText.length,
                    ((index + 1) * animationDuration) / displayText.length
                  ],
                  [0, 1],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }
                );

                const r = interpolate(
                  progress,
                  [0, 0.5, 1],
                  [baseColorRGB.r, highlightColorRGB.r, baseColorRGB.r]
                );
                const g = interpolate(
                  progress,
                  [0, 0.5, 1],
                  [baseColorRGB.g, highlightColorRGB.g, baseColorRGB.g]
                );
                const b = interpolate(
                  progress,
                  [0, 0.5, 1],
                  [baseColorRGB.b, highlightColorRGB.b, baseColorRGB.b]
                );
                const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

                return (
                  <span
                    key={index}
                    style={{
                      color,
                      fontSize: '24px',
                      fontWeight: 600,
                    }}
                  >
                    {char}
                  </span>
                );
              })
            ) : (
              // Static "Remy" text
              <span
                style={{
                  color: `rgb(${baseColorRGB.r}, ${baseColorRGB.g}, ${baseColorRGB.b})`,
                  fontSize: '24px',
                  fontWeight: 600,
                }}
              >
                {displayText}
              </span>
            )
          }
        </div>
      </div>

        {/* Typewriter text */}
        <div style={{
          color: '#fff',
          fontSize: '34px',
          fontWeight: 500,
          minHeight: '72px',
          display: 'flex',
          fontFamily: 'Inter',
          flexDirection: 'column',
          // gap: '16px',
        }}>
          <div>{messagePart1.slice(0, Math.floor(part1Progress))}</div>
          <div>{messagePart2.slice(0, Math.floor(part2Progress))}</div>
      </div>

      </div>

      {/* Cart images */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}>
        {/* Cart 2 (Left) */}
        <div style={{
          position: 'absolute',
          left: '200px',
          // opacity: cartOpacity,
          transform: `translateY(${interpolate(
            frame - cartStartFrame,
            [0, 24], // 300ms at 60fps
            [840, 110],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out
            }
          )}px)`,
        }}>
          <img
            src={staticFile('leftCart.png')}
            alt="Cart 2"
            style={{
              width: '612px',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Cart 1 (Middle) */}
        <div style={{
          position: 'absolute',
          transform: `translateY(${interpolate(
            frame - cartStartFrame,
            [0, 24], // 300ms at 60fps
            [1040, 30], // Move up 40px more than others
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out
            }
          )}px)`,
          // opacity: cartOpacity,
          zIndex: 2, // Ensure middle cart is above others
        }}>
          <img
            src={staticFile('middleCart.png')}
            alt="Cart 1"
            style={{
              width: '640px',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Cart 3 (Right) */}
        <div style={{
          position: 'absolute',
          right: '200px',
          // opacity: cartOpacity,
          transform: `translateY(${interpolate(
            frame - cartStartFrame,
            [0, 24], // 300ms at 60fps
            [840, 110],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: (t) => 1 - Math.pow(1 - t, 2), // ease-out
            }
          )}px)`,
        }}>
          <img
            src={staticFile('rightCart.png')}
            alt="Cart 3"
            style={{
              width: '612px',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
