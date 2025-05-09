
import { Player } from "@remotion/player";
import { RemyAI } from "../components/RemotionVideo/RemyAI";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          <span className="text-sm uppercase tracking-wider bg-[#6e9fff] text-white px-2 py-1 rounded-full mb-2 inline-block">Premium</span>
          <br />
          RemyAI Advertisement
        </h1>
        
        <div className="rounded-xl overflow-hidden shadow-2xl bg-[#121214] border border-[#222]">
          <Player
            component={RemyAI}
            durationInFrames={4600}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={60}
            style={{
              width: '100%',
              aspectRatio: '16/9',
            }}
            controls
            autoPlay
            loop
          />
        </div>
        
        <p className="text-[#888] mt-6 text-center">
          Created with Remotion • Premium design inspired by minimalist principles
        </p>
      </div>
    </div>
  );
};

export default Index;
