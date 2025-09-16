import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function useDayNavigation(startsInDate: Date) {
  const searchParams = useSearchParams();

  const startsIn = useMemo(() => {
    return new Date(
      startsInDate.getFullYear(),
      parseInt(searchParams.get('month') || startsInDate.getMonth().toString()),
      parseInt(searchParams.get('day') || startsInDate.getDate().toString()),
      8,
      30,
    );
  }, [searchParams, startsInDate]);

  const finishIn = useMemo(() => {
    return new Date(2025, startsIn.getMonth(), startsIn.getDate(), 19, 0);
  }, [startsIn]);

  const formattedDateLocale = startsIn.toLocaleDateString('pt', {
    month: 'short',
    day: '2-digit',
  });

  const backParams = new URLSearchParams({
    day: (startsIn.getDate() - 1).toString(),
    month: startsIn.getMonth().toString(),
  });

  const nextParams = new URLSearchParams({
    day: (startsIn.getDate() + 1).toString(),
    month: startsIn.getMonth().toString(),
  });

  return { startsIn, finishIn, formattedDateLocale, backParams, nextParams };
}
