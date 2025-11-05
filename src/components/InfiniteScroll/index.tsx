'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

type InfiniteScrollProps = {
  items: ReactNode[];
  className?: string;
};

export default function InfiniteScroll({ items, className }: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef<number>(0);

  const [isHovering, setIsHovering] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getBaseSpeed = (): number => {
      const width = window.innerWidth;
      if (width < 600) return 20;
      if (width < 1200) return 40;
      return 60;
    };

    let baseSpeed = getBaseSpeed();
    speedRef.current = isHovering ? baseSpeed * 0.2 : baseSpeed;

    const onResize = () => {
      baseSpeed = getBaseSpeed();
      speedRef.current = isHovering ? baseSpeed * 0.2 : baseSpeed;
    };
    window.addEventListener('resize', onResize);

    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!container) return;

      let nextScroll = scroll + speedRef.current * delta;
      const maxScroll = container.scrollWidth / 2;

      if (nextScroll >= maxScroll) {
        nextScroll -= maxScroll;
      }

      setScroll(nextScroll);
      container.scrollLeft = nextScroll;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [isHovering, scroll]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    speedRef.current *= 0.2;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const width = window.innerWidth;
    speedRef.current = width < 600 ? 20 : width < 1200 ? 40 : 60;
  };

  return (
    <div
      className={className}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {[...items, ...items].map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}
