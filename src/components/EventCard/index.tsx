import { Event } from '@/types/event';
import styles from './styles.module.scss';
import { Rooms } from '@/types/rooms';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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

export default function EventCard(props: { event: Event; rooms: Rooms; view: string; onClick?: () => void }) {
  const t = useTranslations('components/eventCard');

  if (!props.event.schedule?.start || !props.event.schedule?.start) return <></>;
  const start = new Date(props.event.schedule.start);
  const end = new Date(props.event.schedule.end);

  const avaiblesRooms = props.rooms
    .map((room, indexRoom) => {
      if (props.event.rooms.includes(room.label)) return indexRoom;
      else return null;
    })
    .filter((room) => room != null);

  const diffTime = diffTimes(start, end, t);

  return (
    <div
      onClick={props.onClick}
      className={`${styles['schedule-default']} ${props.event?.type ? styles['schedule--' + props.event.type] : ''} ${styles['schedule-type--' + props.view]}`}
      style={{
        gridArea: `${labelSlice(start)} / ${avaiblesRooms[0] + 2} / ${labelSlice(end)} / ${avaiblesRooms[avaiblesRooms.length - 1] + 3}`,
      }}
    >
      <div className={styles['schedule-default__wrapper']}>
        <div className={styles['schedule__info']}>
          <h6>{timeFormat(start)}</h6>
          <p>{diffTime.formated}</p>
        </div>
        <div className={styles['schedule__content']}>
          <div>
            <h6>{props.event.title}</h6>
            {props.event.description && <p title={props.event.description}>{props.event.description}</p>}
            {props.view === 'list' && props.rooms.length >= props.event.rooms.length ? (
              <>
                <p>{props.event.rooms.join(', ')}</p>
              </>
            ) : (
              ''
            )}
          </div>

          {props.event.participants && (
            <div className={styles['content__images']}>
              {props.event.participants.map(
                (participant) =>
                  typeof participant === 'object' &&
                  participant !== null &&
                  !Array.isArray(participant) &&
                  participant.image &&
                  participant.name && (
                    <div key={participant.id} className={styles['content__image']}>
                      <Image
                        src={
                          participant.image.startsWith('http')
                            ? participant.image
                            : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/speakers/${participant.image || 'default.jpg'}`
                        }
                        width={240}
                        height={240}
                        alt={participant.name}
                        title={participant.name}
                      />
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
