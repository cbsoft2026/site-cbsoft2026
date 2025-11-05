'use client';

import { Rooms } from '@/types/rooms';
import styles from './styles.module.scss';
import EventCard, { labelSlice, timeFormat } from '@/components/EventCard';
import { useParams, useRouter } from 'next/navigation';
import { Events } from '@/types/event';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import generateTimes from '@/utils/generateTimes';
import { useLocale } from 'next-intl';

type Props = { rooms: Rooms; events: Events; startsIn: string; finishIn: string; typeView: string };

export default function Schedule(props: Props) {
  const router = useRouter();
  const locale = useLocale();
  const { rooms, events, startsIn, finishIn, typeView } = props;
  const { view } = useParams();

  const { width } = useWindowDimensions();

  const startInProcess = new Date(startsIn);
  const finishInProcess = new Date(finishIn);

  const timeslice = generateTimes(startInProcess, finishInProcess, 60);
  const timebreak = generateTimes(startInProcess, finishInProcess, 10);

  if (view === 'calender' && width && width > 768) {
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
            if (event.parentIds && event.parentIds.length === 1) return;

            return (
              <EventCard
                key={`event-${eventIndex}`}
                onClick={() => {
                  if (event.type == 'info') return;
                  router.push(`/${locale}/event?id=${event.id}`);
                }}
                event={event}
                rooms={rooms}
                view={view}
              />
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
            if (event.schedule?.start && event.schedule?.start) {
              const start = new Date(event.schedule.start);
              const finish = new Date(event.schedule.end);

              if (typeView === 'day' && (start < new Date(startsIn) || finish > new Date(finishIn))) {
                return;
              }
              if (event.parentIds && event.parentIds.length === 1) return;

              return (
                <EventCard
                  key={`event-${eventIndex}`}
                  onClick={() => {
                    if (event.type == 'info') return;
                    router.push(`/${locale}/event?id=${event.id}`);
                  }}
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
