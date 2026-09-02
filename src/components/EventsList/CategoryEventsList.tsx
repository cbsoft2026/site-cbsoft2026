import EventComponent from '@/components/Event';
import { Event } from '@/types/event';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';
import { getTranslations } from 'next-intl/server';

const DEFAULT_CATEGORY = '__uncategorized__';

type Props = {
  events: Record<string, Event>;
  locale: string;
  emptyMessage: string;
  sort?: (a: Event, b: Event) => number;
  groupByCategory?: boolean;
};

function deduplicateEvents(events: Record<string, Event>) {
  const unique = new Map<string, [string, Event]>();

  for (const [id, event] of Object.entries(events)) {
    const key = JSON.stringify({
      title: event.title,
      participants: event.participants,
    });

    const current = unique.get(key);

    if (!current) {
      unique.set(key, [id, event]);
      continue;
    }

    const [, currentEvent] = current;

    const currentHasValidSchedule = currentEvent.schedule?.start !== currentEvent.schedule?.end;

    const eventHasValidSchedule = event.schedule?.start !== event.schedule?.end;

    if (!currentHasValidSchedule && eventHasValidSchedule) {
      unique.set(key, [id, event]);
    }
  }

  return Object.fromEntries(unique.values());
}

export async function getCategoryEvents(locale: string, filter: (event: Event) => boolean) {
  const events = mapToObject(loadEvents(locale));

  return Object.entries(events)
    .filter(([, event]) => filter(event))
    .reduce<Record<string, Event>>((acc, [id, event]) => {
      acc[id] = {
        ...event,
        track: null,
      };

      return acc;
    }, {});
}

type CategoryNameProps = {
  locale: string;
  category: string;
};

async function CategoryName({ locale, category }: CategoryNameProps) {
  const commonT = await getTranslations({ locale, namespace: 'common' });
  let name = '';

  if (commonT.has(category) && commonT.has(`siglas.${category}`)) {
    const categoryName = commonT(`siglas.${category}`);
    const categoryAcronym = commonT(category);
    if (categoryName == categoryAcronym) {
      name = commonT(`siglas.${category}`);
    } else {
      name = `${commonT(`siglas.${category}`)} (${commonT(category)})`;
    }
  } else if (commonT.has(category)) {
    name = commonT(category);
  } else if (commonT.has(`siglas.${category}`)) {
    name = commonT(`siglas.${category}`);
  } else {
    name = category.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return name;
}

export default async function CategoryEventsList({
  events,
  locale,
  emptyMessage,
  sort,
  groupByCategory = true,
}: Props) {
  const uniqueEvents = deduplicateEvents(events);

  const grouped = Object.entries(uniqueEvents).reduce<Record<string, Record<string, Event>>>((acc, [id, event]) => {
    const category = groupByCategory ? (event.category ?? DEFAULT_CATEGORY) : (event.simposio ?? DEFAULT_CATEGORY);

    (acc[category] ??= {})[id] = event;

    return acc;
  }, {});

  const categories = Object.keys(grouped).sort((a, b) => {
    if (a === DEFAULT_CATEGORY) return -1;
    if (b === DEFAULT_CATEGORY) return 1;

    return a.localeCompare(b);
  });

  if (!categories.length) {
    return (
      <div className='container'>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category} data-pagefind-body>
          {category !== DEFAULT_CATEGORY && (
            <div className='container'>
              <h4>
                <CategoryName locale={locale} category={category} />
              </h4>
            </div>
          )}

          <EventComponent events={grouped[category]} locale={locale} sort={sort} />
        </div>
      ))}
    </>
  );
}
