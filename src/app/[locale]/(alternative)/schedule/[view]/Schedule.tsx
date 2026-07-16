'use client';

import { Rooms } from '@/types/rooms';
import styles from './styles.module.scss';
import EventCard, { labelSlice, timeFormat } from '@/components/EventCard';
import { Events, Event } from '@/types/event';
import generateTimes from '@/utils/generateTimes';
import { programs } from '@/app/config/event-structure';

type Props = {
  rooms: Rooms;
  events: Events;
  startsIn: string;
  finishIn: string;
  typeView: string;
  view: string;
};

export default function Schedule(props: Props) {
  const { rooms, events, startsIn, finishIn, typeView, view } = props;

  const startInProcess = new Date(startsIn);
  const finishInProcess = new Date(finishIn);

  const timeslice = generateTimes(startInProcess, finishInProcess, 60);
  const timebreak = generateTimes(startInProcess, finishInProcess, 10);

  const hrefEvent = (event: Event) => {
    let prefix = 'symposiums/';
    if (programs.find((program) => program.slug == event.simposio)) prefix = '';
    return event.type == 'info' ? undefined : `${prefix}${event.simposio}/event#${event.id}`;
  };

  if (view === 'calendar') {
    return (
      <div
        style={{
          gridTemplateColumns: `78px repeat(${rooms.length}, 1fr) auto`,
          gridTemplateRows: `[header] 52px ${timebreak.map((time) => `[${labelSlice(time)}] minmax(15px, auto)`).join(' ')}`,
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
        {rooms.map((room, roomIndex) => (
          <div key={`room-${roomIndex}`} className={styles.rooms} style={{ gridArea: `1 / ${roomIndex + 2}` }}>
            <span>
              {room.local}
              <br />
              <i>{room.nome}</i>
            </span>
          </div>
        ))}
        {events.map((event, eventIndex) => {
          if (event.schedule?.start && event.schedule?.start) {
            const start = new Date(event.schedule.start);
            const finish = new Date(event.schedule.end);
            if (start < new Date(startsIn) || finish > new Date(finishIn)) {
              return;
            }
            if (event.type == 'artigo') return;

            return (
              <EventCard key={`event-${eventIndex}`} href={hrefEvent(event)} event={event} rooms={rooms} view={view} />
            );
          }
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
