export function formatDateRange(
  start: string | Date,
  end: string | Date,
  locale: string = 'pt',
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const sameMonth = startDate.getMonth() === endDate.getMonth();
  const sameYear = startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth && sameYear) {
    const dayStart = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(startDate);
    const dayEnd = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(endDate);
    const monthYear = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(endDate);

    if (locale.startsWith('pt')) {
      return `${dayStart} a ${dayEnd} de ${monthYear}`;
    } else {
      return `${monthYear}, ${dayStart} to ${dayEnd}`;
    }
  }

  if (sameYear) {
    const startStr = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(startDate);
    const endStr = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(endDate);
    if (locale.startsWith('pt')) {
      return `${startStr} a ${endStr} de ${endDate.getFullYear()}`;
    } else {
      return `${startStr} – ${endStr}, ${endDate.getFullYear()}`;
    }
  }

  const startStr = new Intl.DateTimeFormat(locale, options).format(startDate);
  const endStr = new Intl.DateTimeFormat(locale, options).format(endDate);
  return `${startStr} – ${endStr}`;
}

export function formatDate(
  date: string | Date,
  locale: string = 'pt',
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function dateOnlyFromISO(date: string): Date {
  if (!date.includes('-')) return new Date(date);
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d);
}
