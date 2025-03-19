
import { Player } from "@remotion/player";
import { ProductAd } from "../components/RemotionVideo/ProductAd";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          <span className="text-sm uppercase tracking-wider bg-[#6e9fff] text-white px-2 py-1 rounded-full mb-2 inline-block">Premium</span>
          <br />
          Product Advertisement
        </h1>
        
        <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1a1a1a] border border-[#333]">
          <Player
            component={ProductAd}
            durationInFrames={300}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            style={{
              width: '100%',
              aspectRatio: '16/9',
            }}
            controls
            autoPlay
            loop
          />
        </div>
        
        <p className="text-[#999] mt-6 text-center">
          Created with Remotion • Premium design inspired by minimalist principles
        </p>
      </div>
    </div>
  );
};

export default Index;
