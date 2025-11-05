'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export default function AboveGeometric() {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  });

  return (
    <div ref={ref} className={`container ${styles['sponsors__above']} ${isVisible ? styles.show : ''}`}>
      <div></div>
      <div></div>
      <div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}
