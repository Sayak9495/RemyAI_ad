import { registerRoot, Composition } from 'remotion';
import { ProductAd } from './components/RemotionVideo/ProductAd';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="product-reveal"
        component={ProductAd}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionVideo);
