
import { Composition } from 'remotion';
import { ProductAd } from './ProductAd';
import { RemyAI } from './RemyAI';

export const RemotionVideo = () => {
  return (
    <>
      {/* <Composition
        id="ProductAd"
        component={ProductAd}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      /> */}
      <Composition
        id="RemyAI"
        component={RemyAI}
        durationInFrames={2300} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
