import { Event, EventType, eventType as eventTypeConst } from '@/types/event';
import { useCallback, useMemo, useState } from 'react';

export type EventFilter = {
  id: string;
  predicate: (event: Event) => boolean;
};

export default function useEventFilter(
  events?: Map<string, Event>,
  symposiums: readonly string[] = [],
  filters: EventFilter[] = [],
) {
  const [eventType, setEventType] = useState<EventType[]>([...eventTypeConst]);
  const [eventSymposiums, setEventSymposiums] = useState<string[]>([...symposiums]);

  const toggleType = useCallback(
    (type: EventType) => {
      setEventType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    },
    [setEventType],
  );

  const toggleSymposiums = useCallback(
    (symposiums: string) => {
      setEventSymposiums((prev) =>
        prev.includes(symposiums) ? prev.filter((t) => t !== symposiums) : [...prev, symposiums],
      );
    },
    [setEventSymposiums],
  );

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const toggleFilter = useCallback((id: string) => {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((filterId) => filterId !== id) : [...prev, id]));
  }, []);

  const filteredEvents = useMemo(
    () =>
      events
        ? Array.from(events.values(), (value) => value).filter(
            (event) =>
              (event.type ? eventType.includes(event.type) : true) &&
              (event.simposio ? eventSymposiums.includes(event.simposio) : true) &&
              filters.filter((filter) => activeFilters.includes(filter.id)).every((filter) => filter.predicate(event)),
          )
        : [],
    [events, eventType, eventSymposiums, filters, activeFilters],
  );

  return {
    eventType,
    toggleType,
    eventSymposiums,
    toggleSymposiums,
    activeFilters,
    toggleFilter,
    filteredEvents,
  };
}
