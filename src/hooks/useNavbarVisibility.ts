import { useEffect, useState } from 'react';

export default function useNavbarVisibility() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < 0) {
        setVisible(true);
      }

      if (e.deltaY > 0) {
        setVisible(false);
      }
    };

    window.addEventListener('wheel', handleWheel, {
      passive: true,
    });

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return visible;
}
