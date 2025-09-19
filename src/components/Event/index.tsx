'use client';

import { Event } from '@/types/event';
import Image from 'next/image';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

type Props = {
  events: Record<string, Event>;
  event: Event;
};

export default function EventComponent({ events, event }: Props) {
  return (
    <section className={`container ${styles['main-content']}`}>
      <main style={{ flexGrow: 1 }}>
        <header className={styles.header}>
          <h1>{event.title}</h1>

          <div className={styles['chips__grouped']}>
            {event.simposio ? (
              <span className={styles.chip}>
                <small>{event.simposio}</small>
              </span>
            ) : (
              ''
            )}
            {event.track ? (
              <span className={styles.chip}>
                <small>{event.track}</small>
              </span>
            ) : (
              ''
            )}
            {event.type ? (
              <span className={styles.chip}>
                <small>{event.type}</small>
              </span>
            ) : (
              ''
            )}
          </div>
        </header>

        {event.schedule && (
          <p className={`${styles['schedule-time']} h4`}>
            <FontAwesomeIcon icon={faCalendar} />
            <span className='text-secondary'>
              {new Date(event.schedule.start).toLocaleDateString('pt', {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -{' '}
              {new Date(event.schedule.end).toLocaleTimeString('pt', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        )}

        {event.description ? <p>{event.description}</p> : ''}
        <table className={styles.table}>
          <tbody>
            {event.parentIds &&
              event.parentIds.map((parentId, index) => {
                const parentEvent = events[parentId] as Event;
                return (
                  <tr key={index}>
                    <th style={{ display: 'flex', minWidth: 150 }}>
                      {parentEvent.schedule ? (
                        <p>
                          {new Date(parentEvent.schedule.start).toLocaleDateString('pt', {
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      ) : (
                        ''
                      )}
                    </th>
                    <td>
                      <h6>{parentEvent.title}</h6>
                      <p>{parentEvent.description}</p>
                      <i>
                        {parentEvent.participants &&
                          parentEvent.participants
                            .map((participant) =>
                              typeof participant === 'object' && participant !== null && !Array.isArray(participant)
                                ? ''
                                : participant,
                            )
                            .join(', ')}
                      </i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
      <aside>
        <h4>Chairs</h4>
        {event.participants && (
          <div className={styles['content__images']}>
            {event.participants.map(
              (participant, index) =>
                typeof participant === 'object' &&
                participant !== null &&
                !Array.isArray(participant) &&
                participant.image &&
                participant.name && (
                  <div key={index}>
                    <div key={participant.id} className={styles['content__image']}>
                      <Image
                        loading='lazy'
                        src={
                          participant.image.startsWith('http')
                            ? participant.image
                            : `/images/speakers/${participant.image || 'default.jpg'}`
                        }
                        width={240}
                        height={240}
                        alt={participant.name}
                        title={participant.name}
                      />
                    </div>
                    <p>{participant.name}</p>
                  </div>
                ),
            )}
          </div>
        )}
      </aside>
    </section>
  );
}
