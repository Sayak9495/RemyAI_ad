import { registerRoot, Composition } from 'remotion';
import { ProductAd } from './components/RemotionVideo/ProductAd';
import { RemyAI } from './components/RemotionVideo/RemyAI';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="product-reveal"
        component={ProductAd}
        durationInFrames={900}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="remy-ai"
        component={RemyAI}
        durationInFrames={4600}  // Total duration based on the latest frame
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionVideo);
