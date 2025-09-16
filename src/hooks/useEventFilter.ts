import { Events, EventType, eventType as eventTypeConst } from '@/types/event';
import { useCallback, useMemo, useState } from 'react';

export default function useEventFilter(events: Events, symposiums: string[] = []) {
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

  if (!eventType.includes('info')) toggleType('info');
  const filteredEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          (event.type ? eventType.includes(event.type) : true) &&
          (event.simposio ? eventSymposiums.includes(event.simposio) : true),
      ),
    [events, eventType, eventSymposiums],
  );

  return { eventType, toggleType, eventSymposiums, toggleSymposiums, filteredEvents };
}
