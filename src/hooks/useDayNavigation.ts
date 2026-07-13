import { formatDate } from '@/utils/dates';
import { useMemo } from 'react';

export default function useDayNavigation(startsInDate: Date, lang: string, date?: string) {
  let year = startsInDate.getFullYear().toString();
  let month = (startsInDate.getMonth() + 1).toString();
  let day = startsInDate.getDate().toString();
  if (date) {
    [year, month, day] = date.split('-');
  }

  // TODO: melhorar forma de obter dada de inicio e finalizacao
  const startsIn = useMemo(() => {
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      startsInDate.getHours(),
      startsInDate.getMinutes(),
    );
  }, [year, month, day, startsInDate]);

  const finishIn = useMemo(() => {
    return new Date(startsInDate.getFullYear(), startsIn.getMonth(), startsIn.getDate(), 22, 0);
  }, [startsInDate, startsIn]);

  const formattedDateLocale = formatDate(startsIn, lang, {
    month: 'short',
    day: '2-digit',
  });

  const backDate = useMemo(() => {
    const previous = new Date(startsIn);
    previous.setDate(previous.getDate() - 1);

    return previous.toISOString().slice(0, 10);
  }, [startsIn]);

  const nextDate = useMemo(() => {
    const next = new Date(startsIn);
    next.setDate(next.getDate() + 1);

    return next.toISOString().slice(0, 10);
  }, [startsIn]);

  return { startsIn, finishIn, formattedDateLocale, backDate, nextDate };
}
