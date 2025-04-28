import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

export const RemyAIFrame21 = () => {
  const frame = useCurrentFrame();
  
  // Animation timing (at 60fps)
  const SVG_START = 0;
  const SVG_DURATION = 30; // 500ms for scale animation
  const REMY_START = SVG_START + SVG_DURATION; // Start Remy immediately after scale
  const REMY_DURATION = 30; // Duration for Remy text animation
  const SUBTITLE_START = REMY_START + REMY_DURATION + 20; // Start subtitle after Remy text
  const SUBTITLE_DURATION = 18; // 300ms duration (18 frames at 60fps)

  // SVG scale animation
  const svgScale = interpolate(
    frame - SVG_START,
    [0, SVG_DURATION],
    [1, 0.35],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  // Group position animation (centers the entire group)
  const groupX = interpolate(
    frame - REMY_START,
    [0, REMY_DURATION],
    [0, -230],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  // Remy text animation
  const remyOpacity = interpolate(
    frame - REMY_START,
    [0, REMY_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  // Combined subtitle and group push animation
  const pushUpAmount = interpolate(
    frame - SUBTITLE_START,
    [0, SUBTITLE_DURATION],
    [0, -3],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  const subtitleY = interpolate(
    frame - SUBTITLE_START,
    [0, SUBTITLE_DURATION],
    [2, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  const subtitleOpacity = interpolate(
    frame - SUBTITLE_START,
    [0, SUBTITLE_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#09090A',
      fontFamily: 'Inter',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background blur rectangles */}
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
      }} />

      {/* Introducing text - no animation */}
      <h2 style={{
        fontSize: '3rem',
        letterSpacing: '0.1em',
        fontWeight: 500,
        color: '#9DA1AD',
        margin: 0,
        marginTop: '8rem',
        marginBottom: '3rem',
      }}>
        INTRODUCING
      </h2>

      {/* Logo and Remy text container with push-up animation */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '440px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4rem',
        marginLeft: '20rem',
        transform: `translateY(${pushUpAmount}rem)`,
        transition: 'transform 0.3s ease',
      }}>
        {/* Group container for SVG and Remy */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          transform: `translateX(${groupX}px)`,
          transition: 'transform 0.3s ease-out',
        }}>
          {/* SVG with scale animation */}
          <div style={{
            transform: `scale(${svgScale})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease',
          }}>
            <svg width="440" height="440" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Strike logo" clip-path="url(#clip0_13191_21551)">
              <path id="Ellipse 923" d="M43.6675 50.335C49.1903 50.335 53.6675 45.8578 53.6675 40.335C53.6675 34.8121 49.1903 30.335 43.6675 30.335C38.1446 30.335 33.6675 34.8121 33.6675 40.335C33.6675 45.8578 38.1446 50.335 43.6675 50.335Z" fill="url(#paint0_linear_13191_21551)"/>
              <path id="Ellipse 924" d="M67.0007 23.6683C70.6825 23.6683 73.6673 20.6835 73.6673 17.0016C73.6673 13.3197 70.6825 10.335 67.0007 10.335C63.3188 10.335 60.334 13.3197 60.334 17.0016C60.334 20.6835 63.3188 23.6683 67.0007 23.6683Z" fill="url(#paint1_linear_13191_21551)"/>
              <path id="Ellipse 933" d="M67.0007 123.668C70.6825 123.668 73.6673 120.684 73.6673 117.002C73.6673 113.32 70.6825 110.335 67.0007 110.335C63.3188 110.335 60.334 113.32 60.334 117.002C60.334 120.684 63.3188 123.668 67.0007 123.668Z" fill="url(#paint2_linear_13191_21551)"/>
              <path id="Ellipse 925" d="M43.6675 103.668C49.1903 103.668 53.6675 99.1908 53.6675 93.668C53.6675 88.1451 49.1903 83.668 43.6675 83.668C38.1446 83.668 33.6675 88.1451 33.6675 93.668C33.6675 99.1908 38.1446 103.668 43.6675 103.668Z" fill="url(#paint3_linear_13191_21551)"/>
              <path id="Ellipse 927" d="M120.334 80.3346C127.698 80.3346 133.668 74.3651 133.668 67.0013C133.668 59.6375 127.698 53.668 120.334 53.668C112.971 53.668 107.001 59.6375 107.001 67.0013C107.001 74.3651 112.971 80.3346 120.334 80.3346Z" fill="url(#paint4_linear_13191_21551)"/>
              <path id="Ellipse 931" d="M67.0008 80.3346C74.3646 80.3346 80.3341 74.3651 80.3341 67.0013C80.3341 59.6375 74.3646 53.668 67.0008 53.668C59.637 53.668 53.6675 59.6375 53.6675 67.0013C53.6675 74.3651 59.637 80.3346 67.0008 80.3346Z" fill="url(#paint5_linear_13191_21551)"/>
              <path id="Ellipse 932" d="M13.6673 80.3346C21.0311 80.3346 27.0006 74.3651 27.0006 67.0013C27.0006 59.6375 21.0311 53.668 13.6673 53.668C6.30352 53.668 0.333984 59.6375 0.333984 67.0013C0.333984 74.3651 6.30352 80.3346 13.6673 80.3346Z" fill="url(#paint6_linear_13191_21551)"/>
              <path id="Ellipse 929" d="M90.3325 103.668C95.8554 103.668 100.333 99.1908 100.333 93.668C100.333 88.1451 95.8554 83.668 90.3325 83.668C84.8097 83.668 80.3325 88.1451 80.3325 93.668C80.3325 99.1908 84.8097 103.668 90.3325 103.668Z" fill="url(#paint7_linear_13191_21551)"/>
              <path id="Ellipse 930" d="M90.3325 50.335C95.8554 50.335 100.333 45.8578 100.333 40.335C100.333 34.8121 95.8554 30.335 90.3325 30.335C84.8097 30.335 80.3325 34.8121 80.3325 40.335C80.3325 45.8578 84.8097 50.335 90.3325 50.335Z" fill="url(#paint8_linear_13191_21551)"/>
              </g>
              <defs>
              <linearGradient id="paint0_linear_13191_21551" x1="53.6675" y1="30.338" x2="33.6675" y2="50.338" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint1_linear_13191_21551" x1="73.6673" y1="10.335" x2="60.334" y2="23.6683" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint2_linear_13191_21551" x1="73.6673" y1="110.335" x2="60.334" y2="123.668" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint3_linear_13191_21551" x1="43.6675" y1="83.668" x2="43.6675" y2="103.668" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint4_linear_13191_21551" x1="133.667" y1="53.6783" x2="107.001" y2="80.345" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint5_linear_13191_21551" x1="80.3337" y1="53.6783" x2="53.6671" y2="80.345" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint6_linear_13191_21551" x1="27.0002" y1="53.6783" x2="0.333579" y2="80.345" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint7_linear_13191_21551" x1="90.3325" y1="83.668" x2="90.3325" y2="103.668" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <linearGradient id="paint8_linear_13191_21551" x1="100.334" y1="30.338" x2="80.3337" y2="50.338" gradientUnits="userSpaceOnUse">
              <stop offset="0.25" stop-color="#A791F5"/>
              <stop offset="1" stop-color="#527BF0"/>
              </linearGradient>
              <clipPath id="clip0_13191_21551">
              <rect width="133.333" height="133.333" fill="white" transform="translate(0.333984 0.332031)"/>
              </clipPath>
              </defs>
            </svg>
          </div>

          {/* Remy text */}
          <h1 style={{
            fontSize: '160px',
            fontWeight: 600,
            margin: 0,
            opacity: remyOpacity,
            color: '#FFFFFF',
            marginLeft: '-6rem',
            whiteSpace: 'nowrap',
          }}>
            Remy
          </h1>
        </div>
      </div>

      {/* Subtitle with slide-up animation */}
      <h2 style={{
        fontSize: '80px',
        fontWeight: 500,
        color: '#F5F5F7',
        margin: 0,
        marginTop: '-9rem',
        opacity: subtitleOpacity,
        transform: `translateY(${subtitleY}rem)`,
        transition: 'transform 0.3s ease-out',
      }}>
        Your AI Foodie Friend
      </h2>
    </div>
  );
};
