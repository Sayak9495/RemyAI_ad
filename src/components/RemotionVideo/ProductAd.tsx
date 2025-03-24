import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TextAnimation } from './TextAnimation';
import { ProductReveal } from './ProductReveal';
import { Frame5 } from './Frame5';
import { Frame6 } from './Frame6';
import { Frame7 } from './Frame7';

export const ProductAd = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('The_Walking_Cat.mp3')} />
      {/* Frame 1-3: Order Food, Faster, Smarter (0-96 frames, 3.2 seconds) */}
      <Sequence from={0} durationInFrames={96}>
        <TextAnimation />
      </Sequence>
      
      {/* Frame 4: Product drop with Samosaa.ai (96-163 frames, 2.7 seconds) */}
      <Sequence from={96} durationInFrames={67}>
        <ProductReveal />
      </Sequence>
      
      {/* Frame 5: What to order tonight? (163-226 frames, 2.1 seconds) */}
      <Sequence from={163} durationInFrames={63}>
        <Frame5 />
      </Sequence>
      
      {/* Frame 6: Now Sorted with samosaa.ai (226-300 frames, 2.5 seconds) */}
      <Sequence from={226} durationInFrames={74}>
        <Frame6 />
      </Sequence>

      {/* Frame 7: Typing animation (300-450 frames, 5 seconds) */}
      <Sequence from={300} durationInFrames={150}>
        <Frame7 />
      </Sequence>
    </AbsoluteFill>
  );
};
