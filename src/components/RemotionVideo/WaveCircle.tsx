import { useCurrentFrame, interpolate } from 'remotion';

interface WaveCircleProps {
  size?: number;
}

export const WaveCircle = ({ size = 32 }: WaveCircleProps) => {
  const frame = useCurrentFrame();
  const barCount = 3;
  const barWidth = size * 0.08;
  const barGap = 4;
  const barHeight = size * 0.5;

  const getBarHeight = (index: number) => {
    const phaseShift = index * (Math.PI / 2); // Offset each bar's animation
    return interpolate(
      Math.sin(frame * 0.2 + phaseShift),
      [-1, 1],
      [barHeight * 0.6, barHeight]
    );
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #527BF0 0%, #A791F5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${barGap}px`,
      }}
    >
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `${barWidth}px`,
            height: `${getBarHeight(index)}px`,
            background: '#1F1F1F',
            borderRadius: '5px',
            transition: 'height 0.1s ease',
          }}
        />
      ))}
    </div>
  );
};
