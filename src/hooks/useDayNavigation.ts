import { formatDate } from '@/utils/dates';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function useDayNavigation(startsInDate: Date, lang: string) {
  const searchParams = useSearchParams();

  // TODO: melhorar forma de obter dada de inicio e finalizacao
  const startsIn = useMemo(() => {
    return new Date(
      startsInDate.getFullYear(),
      parseInt(searchParams.get('month') || startsInDate.getMonth().toString()),
      parseInt(searchParams.get('day') || startsInDate.getDate().toString()),
      startsInDate.getHours(),
      startsInDate.getMinutes(),
    );
  }, [searchParams, startsInDate]);

  const finishIn = useMemo(() => {
    return new Date(startsInDate.getFullYear(), startsIn.getMonth(), startsIn.getDate(), 22, 0);
  }, [startsIn]);

  const formattedDateLocale = formatDate(startsIn, lang, {
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
