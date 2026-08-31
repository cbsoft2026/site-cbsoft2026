'use client';

import { Rooms } from '@/types/rooms';
import styles from './styles.module.scss';
import EventCard, { labelSlice, timeFormat } from '@/components/EventCard';
import { Events, Event } from '@/types/event';
import generateTimes from '@/utils/generateTimes';
import { programs } from '@/app/config/event-structure';
import { useTranslations } from 'next-intl';

type Props = {
  rooms: Rooms;
  events: Events;
  startsIn: string;
  finishIn: string;
  typeView: string;
  view: string;
};

type ParallelGroup = {
  events: Event[];
  start: Date;
  end: Date;
  rooms: string[];
};

function canBeParallel(a: Event, b: Event) {
  if (!a.schedule?.start || !a.schedule?.end) return false;
  if (!b.schedule?.start || !b.schedule?.end) return false;

  const aStart = new Date(a.schedule.start).getTime();
  const aEnd = new Date(a.schedule.end).getTime();
  const bStart = new Date(b.schedule.start).getTime();
  const bEnd = new Date(b.schedule.end).getTime();

  if (aStart !== bStart || aEnd !== bEnd) {
    return false;
  }

  const aRooms = [...(a.rooms ?? [])].sort();
  const bRooms = [...(b.rooms ?? [])].sort();

  if (aRooms.length !== bRooms.length) {
    return false;
  }

  return aRooms.every((room, index) => room === bRooms[index]);
}

function createParallelGroups(events: Event[]): ParallelGroup[] {
  const groups: ParallelGroup[] = [];

  for (const event of events) {
    if (!event.schedule?.start || !event.schedule?.end) {
      continue;
    }

    if (event.type === 'artigo') {
      continue;
    }

    if (!event.rooms || event.rooms.length === 0) {
      continue;
    }

    const existingGroup = groups.find((group) => canBeParallel(group.events[0], event));

    if (existingGroup) {
      existingGroup.events.push(event);
    } else {
      groups.push({
        events: [event],
        start: new Date(event.schedule.start),
        end: new Date(event.schedule.end),
        rooms: event.rooms,
      });
    }
  }

  return groups;
}

export default function Schedule(props: Props) {
  const { rooms, events, startsIn, finishIn, typeView, view } = props;

  const startInProcess = new Date(startsIn);
  const finishInProcess = new Date(finishIn);

  const timeslice = generateTimes(startInProcess, finishInProcess, 60);
  const timebreak = generateTimes(startInProcess, finishInProcess, 10);

  const hrefEvent = (event: Event) => {
    let prefix = 'symposiums/';
    if (programs.find((program) => program.slug == event.simposio)) prefix = '';

    if (event.type != 'info') return `${prefix}${event.simposio}/event#${event.id}`;

    if (event.url != undefined) return event.url;

    return undefined;
  };

  const scheduleT = useTranslations('schedule');

  if (view === 'calendar') {
    const parallelGroups = createParallelGroups(events);
    const parallelEvents = new Set<Event>();

    parallelGroups.forEach((group) => {
      if (group.events.length > 1) {
        group.events.forEach((event) => {
          parallelEvents.add(event);
        });
      }
    });

    return (
      <div
        style={{
          gridTemplateColumns: `78px repeat(${rooms.length}, 1fr) auto`,
          gridTemplateRows: `[header] 52px ${timebreak
            .map((time) => `[${labelSlice(time)}] minmax(15px, auto)`)
            .join(' ')}`,
        }}
        className={styles['grid-schedule']}
      >
        {timeslice.map((time, index) => {
          const startRow = labelSlice(time);
          const endRow = labelSlice(timeslice[index + 1] ?? time);

          return (
            <div
              className={styles.timeslice}
              key={`timeslice-${time.toString()}`}
              data-slice={time.toString()}
              style={{ gridArea: `${startRow} / 1 / ${endRow} / 2` }}
            >
              {timeFormat(time)}
            </div>
          );
        })}

        {timeslice.map((time, index) => {
          const startRow = labelSlice(time);
          const endRow = labelSlice(timeslice[index + 1] ?? time);
          return (
            <div
              className={styles.timebreak}
              key={`timebreak-${time.toString()}`}
              data-slice={time.toString()}
              style={{ gridArea: `${startRow} / 1 / ${endRow} / ${rooms.length + 3}` }}
            />
          );
        })}

        <div className={styles.rooms} style={{ gridArea: '1 / 1' }}></div>

        {rooms.map((room, roomIndex) => {
          let local = room.label;
          let name = room.label;

          if (scheduleT.has(room.label)) {
            local = scheduleT(room.label);
          }
          if (scheduleT.has(`${room.label}-name`)) {
            name = scheduleT(`${room.label}-name`);
          }

          const hasParallel = parallelGroups.some((group) => {
            if (group.events.length <= 1) {
              return false;
            }

            if (!group.rooms.includes(room.label)) {
              return false;
            }

            return group.start >= new Date(startsIn) && group.end <= new Date(finishIn);
          });

          return (
            <div
              key={`room-${roomIndex}`}
              className={`${styles.rooms} ${hasParallel ? styles['room--parallel'] : ''}`}
              style={{ gridArea: `1 / ${roomIndex + 2}` }}
            >
              <span>
                {local}
                <br />
                <i>{name}</i>
              </span>
            </div>
          );
        })}

        {parallelGroups
          .filter((group) => group.events.length > 1)
          .map((group, groupIndex) => {
            const start = group.start;
            const finish = group.end;

            if (start < new Date(startsIn) || finish > new Date(finishIn)) {
              return null;
            }

            const availableRooms = rooms
              .map((room, indexRoom) => {
                if (group.rooms.includes(room.label)) {
                  return indexRoom;
                }

                return null;
              })
              .filter((room) => room != null) as number[];

            if (availableRooms.length === 0) {
              return null;
            }

            const startRoom = availableRooms[0] + 2;
            const finishRoom = availableRooms[availableRooms.length - 1] + 3;

            console.log(group.events);

            return (
              <div
                key={`parallel-group-${groupIndex}`}
                className={styles['parallel-events']}
                style={{
                  gridArea: `${labelSlice(start)} / ${startRoom} / ${labelSlice(finish)} / ${finishRoom}`,
                  gridTemplateColumns: `repeat(${group.events.length}, minmax(0, 1fr))`,
                }}
              >
                {[...group.events]
                  .sort((a, b) => {
                    if (a.type === 'session' && b.type !== 'session') return -1;
                    if (a.type !== 'session' && b.type === 'session') return 1;
                    return 0;
                  })
                  .map((event, eventIndex) => (
                    <EventCard
                      key={`parallel-event-${event.id ?? eventIndex}`}
                      href={hrefEvent(event)}
                      event={event}
                      rooms={rooms}
                      view={view}
                      nested
                    />
                  ))}
              </div>
            );
          })}

        {events.map((event, eventIndex) => {
          if (!event.schedule?.start || !event.schedule?.end) {
            return null;
          }

          if (event.type === 'artigo') {
            return null;
          }

          if (parallelEvents.has(event)) {
            return null;
          }

          const start = new Date(event.schedule.start);
          const finish = new Date(event.schedule.end);

          if (start < new Date(startsIn) || finish > new Date(finishIn)) {
            return null;
          }

          if (!event.rooms) {
            return null;
          }

          return (
            <EventCard
              key={`event-${event.id ?? eventIndex}`}
              href={hrefEvent(event)}
              event={event}
              rooms={rooms}
              view={view}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles['list-schedule']}>
        {events
          .sort((a, b) => (a.schedule && b.schedule ? (a.schedule?.start > b.schedule?.start ? 1 : -1) : 0))
          .map((event, eventIndex) => {
            if (event.schedule?.start && event.schedule?.end) {
              const start = new Date(event.schedule.start);
              const finish = new Date(event.schedule.end);

              if (typeView === 'day' && (start < new Date(startsIn) || finish > new Date(finishIn))) {
                return;
              }
              if (event.type == 'artigo') return;

              return (
                <EventCard
                  key={`event-${eventIndex}`}
                  href={hrefEvent(event)}
                  event={event}
                  rooms={rooms}
                  view={'list'}
                />
              );
            }
          })}
      </div>
    );
  }
}
