import React, { useMemo, JSX, useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';

type GeometricFn = (color: string) => JSX.Element;

interface WeightedItem<T> {
  value: T;
  weight: number;
}

function weightedRandom<T>(items: WeightedItem<T>[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulative = 0;

  for (const item of items) {
    cumulative += item.weight;
    if (random < cumulative) {
      return item.value;
    }
  }

  return items[items.length - 1].value;
}

const geometrics: WeightedItem<GeometricFn>[] = [
  {
    value: (color) => <circle fill={color} cx='20' cy='20' r='20' />,
    weight: 1,
  },
  {
    value: (color) => <path fill={color} d='M40 40V0H0a40 40 0 0 0 40 40z' />,
    weight: 1,
  },
  {
    value: (color) => <path fill={color} d='M0 0v40h40A40 40 0 0 0 0 0z' />,
    weight: 4,
  },
  {
    value: (color) => <path fill={color} d='M0 0h40v40h-40z' />,
    weight: 4,
  },
];

const colors = ['#1d656d', '#f09415', '#b43425', '#d5491d', '#077875'];

const rotations = [0, 90, 180, 270];

const BackgroundGeometric = (amount: number) => {
  const getRandomGeometric = useCallback(() => {
    const Geometric = weightedRandom(geometrics);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = rotations[Math.floor(Math.random() * rotations.length)];

    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' style={{ transform: `rotate(${rotation}deg)` }}>
        {Geometric(color)}
      </svg>
    );
  }, []);

  const initialGeometric = useMemo(() => {
    return Array.from({ length: amount }).map((_, index) => {
      return (
        <svg key={index} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
          <path fill={'#d5491d'} d='M0 0h40v40h-40z' />
        </svg>
      );
    });
  }, [amount]);

  const [animate, setAnimate] = useState(false);
  const [shapes, setShapes] = useState(initialGeometric);
  const [animateIds, setAnimateIds] = useState<Set<number>>(new Set());

  const handleClick = useCallback(
    (id: number, delay = 300) => {
      setAnimateIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setShapes((prev) => prev.map((shape, i) => (i === id ? getRandomGeometric() : shape)));
        setAnimateIds((prev) => {
          const copy = new Set(prev);
          copy.delete(id);
          return copy;
        });
      }, delay);
    },
    [getRandomGeometric],
  );

  useEffect(() => {
    if (animate == true) return
    const timer = setTimeout(() => {
      setAnimate(true);
      shapes.forEach((shape, index) => {
        const delay = Math.floor(Math.random() * (1000 - 300)) + 300;
        handleClick(index, delay);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [handleClick, shapes]);

  const backgroundGeometric = useMemo(() => {
    return (
      <>
        {shapes.map((element, i) => {
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                transform: animateIds.has(i) ? 'scale(0)' : 'scale(1)',
                opacity: animateIds.has(i) ? '0' : '1',
              }}
              className={styles.box}
            >
              {element}
            </div>
          );
        })}
      </>
    );
  }, [shapes, animateIds, handleClick]);

  return backgroundGeometric;
};

export default BackgroundGeometric;
