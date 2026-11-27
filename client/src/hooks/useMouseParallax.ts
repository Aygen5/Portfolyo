import { useCallback, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface ParallaxOffset {
  x: number;
  y: number;
}

export function useMouseParallax(maxOffset = 6) {
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset({
        x: Number((relX * maxOffset).toFixed(2)),
        y: Number((relY * maxOffset).toFixed(2)),
      });
    },
    [maxOffset, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return { offset, handleMouseMove, handleMouseLeave };
}
