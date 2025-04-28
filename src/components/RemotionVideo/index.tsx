import { Composition } from 'remotion';
import { RemyAI } from './RemyAI';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="RemyAI"
        component={RemyAI}
        durationInFrames={4600} // 30 seconds at 60fps (doubled from 2300)
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
