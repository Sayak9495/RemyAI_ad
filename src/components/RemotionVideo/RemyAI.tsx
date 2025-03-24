import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { RemyAIFrame1 } from './remyAI_Frame1';
import { RemyAIFrame11 } from './remyAI_Frame11';
import { RemyAIFrame2 } from './remyAI_Frame2';
import { RemyAIFrame21 } from './remyAI_Frame21';
import { RemyAIFrame5 } from './remyAI_Frame5';
import { RemyAIFrame7 } from './remyAI_Frame7';
import { RemyAIFrame71 } from './remyAI_Frame71';
import { RemyAIFrame72 } from './remyAI_Frame72';
import { RemyAIFrame73 } from './remyAI_Frame73';
import { RemyAIFrame8_1 } from './remyAI_Frame8_1';
import { RemyAIFrame8_2 } from './remyAI_Frame8_2';
import { RemyAIFrame8 } from './remyAI_Frame8';
import { RemyAIFrame9 } from './remyAI_Frame9';
import { RemyAIFrame9_1 } from './remyAI_Frame9_1';
import { RemyAIFrame9_2 } from './remyAI_Frame9_2';
import { RemyAIFrame9_3 } from './remyAI_Frame9_3';
import { RemyAIFrame9_4 } from './remyAI_Frame9_4';
import { RemyAIFrame72_Confirmation } from './remyAI_Frame72_Confirmation';
import { FrameCounter } from './FrameCounter';
export const RemyAI = () => {
  return (
    <AbsoluteFill>
      <FrameCounter />
      {/* <Audio src={staticFile('The_Walking_Cat.mp3')} /> */}
      
      {/* Frame 1: Phrases animation */}
      <Sequence from={0} durationInFrames={280}>
        <RemyAIFrame1 />
      </Sequence>

      {/* Frame 11: Tired of... animation (2.5s = 75 frames)
      <Sequence from={42} durationInFrames={90}>
        <RemyAIFrame11 />
      </Sequence> */}

      {/* Frame 2: Can't decide what to order? (1.5s = 45 frames) */}
      <Sequence from={280} durationInFrames={50}>
        <RemyAIFrame2 />
      </Sequence>

      {/* Frame 21: Introducing Remy (2.5 seconds) */}
      <Sequence from={330} durationInFrames={80}>
        <RemyAIFrame21 />
      </Sequence>

      {/* Frame 5: What to order tonight? (2.1 seconds) */}
      <Sequence from={410} durationInFrames={70}>
        <RemyAIFrame5 />
      </Sequence>

      {/* Frame 7: Search queries animation (13.3 seconds) */}
      <Sequence from={480} durationInFrames={270}>
        <RemyAIFrame7 />
      </Sequence>

      {/* Frame 71: Perfect Suggestions text (2 seconds) */}
      <Sequence from={750} durationInFrames={55}>
        <RemyAIFrame71 />
      </Sequence>

      {/* Frame 72: Cart UI animation (5 seconds) */}
      <Sequence from={805} durationInFrames={185}>
        <RemyAIFrame72 />
      </Sequence>

      {/* Frame 72_1: Cart UI animation (5 seconds)
      <Sequence from={970} durationInFrames={66}>
        <RemyAIFrame72_Confirmation />
      </Sequence> */}

      {/* Frame 73: Remy can do more (1.8 seconds = 1.3s animation + 0.5s hold) */}
      <Sequence from={990} durationInFrames={66}>
        <RemyAIFrame73 />
      </Sequence>

      {/* Frame 5 again: Final frame (14 seconds) */}
      {/* Frame 8: Assistant listening animation (5.8 seconds = 2s initial + 0.4s movement + 2.9s typing + 0.5s hold) */}
      <Sequence from={1056} durationInFrames={217}>
        <RemyAIFrame8 />
      </Sequence>

      {/* Frame 8.1: Thinking animation (2 seconds) */}
      <Sequence from={1273} durationInFrames={58}>
        <RemyAIFrame8_1 />
      </Sequence>

      {/* Frame 8.2: Speaking with cart suggestions (4 seconds) */}
      <Sequence from={1331} durationInFrames={260}>
        <RemyAIFrame8_2 />
      </Sequence>

      {/* Frame 9: Remy bonds with you (1.3 seconds = 0.3s animation + 1s hold) */}
      <Sequence from={1591} durationInFrames={60}>
        <RemyAIFrame9 />
      </Sequence>

      {/* Frame 9.1: So that + rotating words (2.7 seconds) */}
      <Sequence from={1651} durationInFrames={234}>
        <RemyAIFrame9_1 />
      </Sequence>

      {/* Frame 9.2: Final message and signature (1.2 seconds = 0.4s + 0.3s + 0.2s + 0.3s) */}
      <Sequence from={1885} durationInFrames={55}>
        <RemyAIFrame9_2 />
      </Sequence>

      {/* Frame 9.3: Remy with typewriter animation (6 seconds = 0.3s + 1s + 2s + 0.2s + 1s) */}
      <Sequence from={1940} durationInFrames={200}>
        <RemyAIFrame9_3 />
      </Sequence>

      {/* Frame 9.4: Remy with typewriter animation (6 seconds = 0.3s + 1s + 2s + 0.2s + 1s) */}
      <Sequence from={2140} durationInFrames={180}>
        <RemyAIFrame9_4 />
      </Sequence>
    </AbsoluteFill>
  );
};
