import { useCurrentFrame, interpolate } from 'remotion';
import './fonts.css';

const StylishUnderline = ({ show, wordLength, delay }: { show: boolean; wordLength: number; delay: number }) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(
    Math.max(frame - delay, 0),
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3)
    }
  );

  if (!show) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '-2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${wordLength * 0.6}em`,
      height: '2.5rem',
      opacity: progress,
    }}>
      {/* First underline */}
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1418 125"><path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="#000"></path></svg> */}
      {/* Second underline */}
      {/* <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: '1.0rem',
        }}
      >
        <path
          d={`M0,10 Q25,${15 + Math.cos(frame/10) * 3} 50,10 T100,10`}
          fill="none"
          stroke="#8B6FED"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={100 - (progress * 100)}
        />
      </svg> */}
    </div>
  );
};

export const RemyAIFrame1 = () => {
  const frame = useCurrentFrame();
  
  // Animation timing (at 60fps)
  const LETTER_DURATION = 4; // Duration for each letter animation
  const LETTER_DELAY = 3.6; // Delay between each letter
  const PHRASE_DURATION = 80; // Duration to show each phrase
  const SCALE_DURATION = 12; // 200ms for scale animation
  const HOLD_DURATION = 500; // Duration to hold the last phrase

  const phrases = [
    'Hungry?',
    'Late Night Movie',
    'House Party',
    'IPL Match',
    "Office Lunch",
    'But...'
  ];

  // Words that need underline
  const wordsToUnderline = ['Movie?', 'Party?', 'IPL', 'But...'];

  // Calculate which phrase to show based on current frame
  const phraseIndex = Math.min(
    Math.floor(frame / PHRASE_DURATION),
    phrases.length - 1
  );
  const currentText = phrases[phraseIndex];
  const phraseStartFrame = phraseIndex * PHRASE_DURATION;

  // Scale and opacity animation for non-first phrases
  const scaleProgress = interpolate(
    Math.max(frame - phraseStartFrame, 0),
    [0, SCALE_DURATION],
    [1.5, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      }
    }
  );

  const phraseOpacity = interpolate(
    Math.max(frame - phraseStartFrame, 0),
    [0, SCALE_DURATION],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => t
    }
  );

  // Function to get animation properties for each letter
  const getLetterStyle = (index: number) => {
    if (phraseIndex === 0 || phraseIndex === phrases.length - 1) {
      // Letter-by-letter animation for "HUNGRY?" and "But..."
      const delay = index * LETTER_DELAY;
      const progress = interpolate(
        Math.max(frame - phraseStartFrame - delay, 0),
        [0, LETTER_DURATION],
        [0, 1],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: (t) => 1 - Math.pow(1 - t, 3)
        }
      );

      const opacity = progress;
      const blur = interpolate(
        progress,
        [0, 0.6, 1],
        [8, 2, 0],
        { extrapolateRight: 'clamp' }
      );
      const translateY = interpolate(
        progress,
        [0, 1],
        [20, 0],
        { extrapolateRight: 'clamp' }
      );

      return {
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translateY(${translateY}px)`,
        display: 'inline-block',
      };
    } else {
      // Scale animation for all other phrases
      return {
        display: 'inline-block'
      };
    }
  };

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#09090A',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      <h1 style={{
        fontSize: phraseIndex == 0 ? '120px' : '120px',
        fontWeight: 600,
        color: '#F5F5F7',
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2.5rem',
        justifyContent: 'center',
        perspective: '1000px',
        transform: phraseIndex !== 0 && phraseIndex !== phrases.length - 1 ? `scale(${scaleProgress})` : 'none',
        transformOrigin: 'center',
        opacity: phraseIndex !== 0 && phraseIndex !== phrases.length - 1 ? phraseOpacity : 1,
      }}>
        {currentText.split(' ').map((word, wordIndex) => (
          <div
            key={`word-${phraseIndex}-${wordIndex}`}
            style={{
              display: 'flex',
              gap: '0.3rem',
              position: 'relative',
            }}
          >
            {word.split('').map((letter, letterIndex) => (
              <span
                key={`${phraseIndex}-${wordIndex}-${letterIndex}`}
                style={phraseIndex === 0 || phraseIndex === phrases.length - 1 ? 
                  getLetterStyle(wordIndex * word.length + letterIndex) : 
                  { display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
            <StylishUnderline 
              show={wordsToUnderline.includes(word)}
              wordLength={word.length}
              delay={phraseIndex === 0 || phraseIndex === phrases.length - 1 ? 
                (phraseStartFrame + (wordIndex * word.length + word.length) * LETTER_DELAY) :
                phraseStartFrame}
            />
          </div>
        ))}
      </h1>
    </div>
  );
};
