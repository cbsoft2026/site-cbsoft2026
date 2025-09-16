import { Events, EventType, eventType as eventTypeConst } from '@/types/event';
import { useCallback, useMemo, useState } from 'react';

export default function useEventFilter(events: Events) {
  const [eventType, setEventType] = useState<EventType[]>([...eventTypeConst]);

  const toggleType = useCallback(
    (type: EventType) => {
      setEventType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    },
    [setEventType],
  );

  if (!eventType.includes('info')) toggleType('info');
  const filteredEvents = useMemo(
    () => events.filter((event) => (event.type ? eventType.includes(event.type) : true)),
    [events, eventType],
  );

  return { eventType, toggleType, filteredEvents };
}
