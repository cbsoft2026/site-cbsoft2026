import { useEffect, useState } from 'react';

function useCountdown(targetDate: Date) {
  const [countDown, setCountDown] = useState(targetDate.getTime() - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = targetDate.getTime() - new Date().getTime();
      setCountDown(distance > 0 ? distance : 0); // Garante que não ficará negativo
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(countDown);
}

function getReturnValues(countDown: number) {
  // calculate time left

  if (countDown <= 0) {
    return [0, 0, 0, 0];
  }

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
}

export { useCountdown };
