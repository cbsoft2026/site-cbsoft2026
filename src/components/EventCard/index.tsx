import { Event } from '@/types/event';
import styles from './styles.module.scss';
import { Rooms } from '@/types/rooms';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LinkLocale from '../LinkLocale';
import React from 'react';

type Props = {
  event: Event;
  rooms: Rooms;
  view: string;
  href?: string;
};

export function timeFormat(datetime: Date) {
  return `${String(datetime.getHours()).padStart(2, '0')}:${String(datetime.getMinutes()).padStart(2, '0')}`;
}

const MINUTE = 60 * 1000;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type TFunctionEventCard = ReturnType<typeof useTranslations<'components/eventCard'>>;

export function diffTimes(a: Date, b: Date, t: TFunctionEventCard) {
  const diffMilliseconds = b.getTime() - a.getTime();
  const diffDays = Math.floor(diffMilliseconds / DAY);
  const diffHrs = Math.floor((diffMilliseconds % DAY) / HOUR);
  const diffMins = Math.round(((diffMilliseconds % DAY) % HOUR) / MINUTE);

  let formated = '';
  if (diffDays > 0) formated += `${diffDays} ${t('dias')} `;
  if (diffHrs > 0) formated += `${diffHrs}h`;
  if (diffMins > 0) formated += `${diffMins}min`;

  return { day: diffDays, hour: diffHrs, minute: diffMins, formated: formated };
}

export function labelSlice(datetime: Date) {
  return `slice-${datetime.getDay()}-${datetime.getMonth()}-${datetime.getHours()}-${datetime.getMinutes()}`;
}

function EventCardWrapper(props: Props, start: Date, end: Date) {
  const t = useTranslations('components/eventCard');

  const diffTime = diffTimes(start, end, t);

  const rooms = props.event.rooms ?? [];

  const eventRooms = (() => {
    return rooms.map((roomEvent) => props.rooms.find((room) => room.label == roomEvent)?.nome).join(', ');
  })();

  return (
    <div className={styles['schedule-default__wrapper']}>
      <div className={styles['schedule__info']}>
        <h6>{timeFormat(start)}</h6>
        <p>{diffTime.formated}</p>
      </div>
      <div className={styles['schedule__content']}>
        <div>
          <div>
            <h6 title={props.event.title}>{props.event.title}</h6>
            {props.event.description && <p title={props.event.description}>{props.event.description}</p>}
            {props.view === 'list' && props.rooms.length > rooms.length ? <p>{eventRooms}</p> : ''}
          </div>

          {props.event.moderators && (
            <div className={styles['content__images']}>
              {props.event.moderators?.map((participant) => {
                if (participant === null || Array.isArray(participant)) {
                  return null;
                }

                const isString = typeof participant === 'string';

                const key = isString ? participant : participant.id;
                const name = isString ? participant : participant.name;

                const image = isString
                  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/nonimage.png`
                  : participant.image?.startsWith('http')
                    ? participant.image
                    : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/${
                        participant.image ? `speakers/${participant.image}` : 'nonimage.png'
                      }`;

                return (
                  <div key={key} className={styles['content__image']}>
                    <Image src={image} width={240} height={240} alt={name} title={name} />
                  </div>
                );
              })}
            </div>
          )}

          {props.event.participants && (
            <div
              className={(() => {
                if (props.event.participants.length <= 1) return styles['content__solo'];
                return styles['content__images'];
              })()}
            >
              {props.event.participants?.map((participant) => {
                if (participant === null || Array.isArray(participant)) {
                  return null;
                }

                const isString = typeof participant === 'string';

                const key = isString ? participant : participant.id;
                const name = isString ? participant : participant.name;

                const image = isString
                  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/nonimage.png`
                  : participant.image?.startsWith('http')
                    ? participant.image
                    : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/${
                        participant.image ? `speakers/${participant.image}` : 'nonimage.png'
                      }`;

                return (
                  <React.Fragment key={key}>
                    <div className={styles['content__image']}>
                      <Image src={image} width={240} height={240} alt={name} title={name} />
                    </div>
                    {!isString && props.event.participants.length <= 1 && (
                      <div>
                        <b>{participant.name}</b>
                        {participant.institution_acronym && (
                          <p className='text-secondary'>{participant.institution_acronym}</p>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventCard(props: Props) {
  if (!props.event.schedule?.start || !props.event.schedule?.start) return <></>;
  const start = new Date(props.event.schedule.start);
  const end = new Date(props.event.schedule.end);

  const rooms = props.event.rooms ?? [];

  const avaiblesRooms = props.rooms
    .map((room, indexRoom) => {
      if (rooms.includes(room.label)) return indexRoom;
      else return null;
    })
    .filter((room) => room != null);

  let startRoom = avaiblesRooms[0] + 2;
  let finishRoom = avaiblesRooms[avaiblesRooms.length - 1] + 3;

  if (!startRoom || isNaN(startRoom)) {
    startRoom = props.rooms.length + 2;
    finishRoom = props.rooms.length + 3;
  }

  return props.href ? (
    <LinkLocale
      href={props.href}
      className={`${styles['schedule-default']} ${props.event?.type ? styles['schedule--' + props.event.type] : ''} ${styles['schedule-type--' + props.view]}`}
      style={{
        gridArea: `${labelSlice(start)} / ${startRoom} / ${labelSlice(end)} / ${finishRoom}`,
      }}
    >
      {EventCardWrapper(props, start, end)}
    </LinkLocale>
  ) : (
    <div
      className={`${styles['schedule-default']} ${props.event?.type ? styles['schedule--' + props.event.type] : ''} ${styles['schedule-type--' + props.view]}`}
      style={{
        gridArea: `${labelSlice(start)} / ${startRoom} / ${labelSlice(end)} / ${finishRoom}`,
      }}
    >
      {EventCardWrapper(props, start, end)}
    </div>
  );
}
