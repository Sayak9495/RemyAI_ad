import {Config} from 'remotion';

export const config: typeof Config = {
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 330,
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
