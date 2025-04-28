import {Config} from 'remotion';

export const config: typeof Config = {
  fps: 60,
  width: 360,
  height: 640,
  durationInFrames: 4600,
};

export const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.mp3$/,
        type: 'asset/resource',
      },
    ],
  },
};
