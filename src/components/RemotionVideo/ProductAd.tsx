
import { AbsoluteFill, interpolate, useCurrentFrame, spring, Sequence } from 'remotion';
import { TextAnimation } from './TextAnimation';
import { ProductReveal } from './ProductReveal';
import { SubtitleText } from './SubtitleText';

export const ProductAd = () => {
  const frame = useCurrentFrame();
  
  // Dark theme background color
  const backgroundColor = `#0a0a0a`;

  return (
    <AbsoluteFill style={{ 
      backgroundColor, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'hidden',
    }}>
      {/* First 5 seconds: Headline animation */}
      <Sequence from={0} durationInFrames={150}>
        <TextAnimation />
      </Sequence>

      {/* Second 5 seconds: Product reveal and subtitles */}
      <Sequence from={135}>
        <ProductReveal />
      </Sequence>

      {/* Top subtitle */}
      <Sequence from={180}>
        <SubtitleText 
          text="with twitterAI" 
          position="top" 
        />
      </Sequence>

      {/* Bottom subtitle */}
      <Sequence from={195}>
        <SubtitleText 
          text="your manager who knows what you want to code" 
          position="bottom" 
        />
      </Sequence>
    </AbsoluteFill>
  );
};
