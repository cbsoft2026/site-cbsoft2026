'use client';

import { Rooms } from '@/types/rooms';
import styles from './styles.module.scss';
import EventCard, { labelSlice, timeFormat } from '@/components/EventCard';
import { useParams } from 'next/navigation';
import { Events } from '@/types/event';
import useWindowDimensions from '@/hooks/useWindowDimentions';

type Props = { rooms: Rooms; events: Events; startsIn: string; finishIn: string };

export default function Schedule(props: Props) {
  const { rooms, events, startsIn, finishIn } = props;
  const { view } = useParams();

  const { width } = useWindowDimensions();

  const spaceTime = 30; //minutes
  const startInProcess = new Date(startsIn);
  const finishInProcess = new Date(finishIn);
  const times = [];
  while (finishInProcess > startInProcess) {
    times.push(new Date(startInProcess));
    startInProcess.setMinutes(startInProcess.getMinutes() + spaceTime);
  }
  times.push(new Date(startInProcess));

  if (view === 'calender' && width && width > 768) {
    return (
      <div
        style={{
          gridTemplateColumns: `78px repeat(${rooms.length}, 1fr) auto`,
          gridTemplateRows: `[header] 52px ${times.map((time) => `[${labelSlice(time)}] minmax(60px, auto)`).join(' ')}`,
        }}
        className={styles['grid-schedule']}
      >
        {times.map((time) => (
          <div
            className={styles.timeslice}
            key={`timeslice-${time.toString()}`}
            data-slice={time.toString()}
            style={{ gridArea: `${labelSlice(time)} / 1 / auto` }}
          >
            {timeFormat(time)}
          </div>
        ))}
        {times.map((time) =>
          Array.from(Array(rooms.length + 3).keys()).map((index) => (
            <div
              className={styles.timebreak}
              key={`timebreak-${index}-${time.toString()}`}
              data-slice={time.toString()}
              style={{ gridArea: `${labelSlice(time)} / 1 / ${labelSlice(time)} / ${index}` }}
            />
          )),
        )}
        <div className={styles.rooms} style={{ gridArea: '1 / 1' }}></div>
        {rooms.map((room, roomIndex) => (
          <div key={`room-${roomIndex}`} className={styles.rooms} style={{ gridArea: `1 / ${roomIndex + 2}` }}>
            {room.label}
          </div>
        ))}
        {events.map((event, eventIndex) => {
          if (event.schedule?.start && event.schedule?.start) {
            const start = new Date(event.schedule.start);
            const finish = new Date(event.schedule.end);
            if (start < new Date(startsIn) || finish > new Date(finishIn)) {
              return;
            }

            return <EventCard key={`event-${eventIndex}`} event={event} rooms={rooms} view={view} />;
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
            if (event.schedule?.start && event.schedule?.start) {
              const start = new Date(event.schedule.start);
              const finish = new Date(event.schedule.end);
              if (start < new Date(startsIn) || finish > new Date(finishIn)) {
                return;
              }

              return <EventCard key={`event-${eventIndex}`} event={event} rooms={rooms} view={'list'} />;
            }
          })}
      </div>
    );
  }
}
