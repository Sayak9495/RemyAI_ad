import { useCurrentFrame } from 'remotion';

export const FrameCounter = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '16px',
      fontFamily: 'monospace',
      zIndex: 9999,
    }}>
      Frame: {frame}
    </div>
  );
};
