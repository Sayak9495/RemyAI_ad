
import { AbsoluteFill, interpolate, useCurrentFrame, spring, Sequence } from 'remotion';
import { TextAnimation } from './TextAnimation';
import { ProductReveal } from './ProductReveal';
import { SubtitleText } from './SubtitleText';

export const ProductAd = () => {
  const frame = useCurrentFrame();
  
  // Enhanced dark theme background with subtle gradient
  const backgroundColor = `linear-gradient(160deg, #121214 0%, #0a0a10 100%)`;

  return (
    <AbsoluteFill style={{ 
      background: backgroundColor, 
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

      {/* Top subtitle - appears earlier with heading style */}
      <Sequence from={165}>
        <SubtitleText 
          text="with twitterAI" 
          position="top"
          isHeading={true}
          delay={5} // Small delay
        />
      </Sequence>

      {/* Bottom subtitle - appears later with more delay */}
      <Sequence from={195}>
        <SubtitleText 
          text="your manager who knows what you want to code" 
          position="bottom"
          delay={15} // Additional delay for staggered effect
        />
      </Sequence>
    </AbsoluteFill>
  );
};
