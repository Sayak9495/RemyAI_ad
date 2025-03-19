
import { Composition } from 'remotion';
import { ProductAd } from './ProductAd';

export const RemotionVideo = () => {
  return (
    <Composition
      id="ProductAd"
      component={ProductAd}
      durationInFrames={300} // 10 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
