import { Event } from '@/types/event';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { getTranslations } from 'next-intl/server';
import SpeakerCard from '@/components/SpeakerCard';

type Props = {
  events: Record<string, Event>;
  event?: Event;
  locale: string;
};

async function ParentTable({ events, event, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'pages/schedule' });

  const hasParentEvents = (event && event.parentIds) || (!event && events);

  if (!hasParentEvents) return <></>;

  const parentsEvents = event?.parentIds || Object.values(events);

  if (parentsEvents.length <= 0)
    return (
      <tr>
        <td>
          <p>{t('noContent')}</p>
        </td>
      </tr>
    );

  return (event?.parentIds || Object.values(events)).map((parentId, index) => {
    const parentEvent = typeof parentId === 'string' ? (events[parentId] as Event) : parentId;
    return (
      <tr key={index}>
        <th style={{ display: 'flex', minWidth: 150 }}>
          {parentEvent.schedule ? (
            <p>
              {new Date(parentEvent.schedule.start).toLocaleDateString(locale, {
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
          <div className={styles['chips__grouped']}>
            {parentEvent.track ? (
              <span className={styles.chip}>
                <small>{parentEvent.track}</small>
              </span>
            ) : (
              ''
            )}
          </div>
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
  });
}

export default async function EventComponent({ events, event, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'pages/schedule' });

  return (
    <section className={`container ${styles['main-content']}`}>
      <main style={{ flexGrow: 1 }}>
        {event ? (
          <>
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
                  {new Date(event.schedule.start).toLocaleDateString(locale, {
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  -{' '}
                  {new Date(event.schedule.end).toLocaleTimeString(locale, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </p>
            )}

            {event.description ? <p>{event.description}</p> : ''}
          </>
        ) : (
          <></>
        )}

        <table className={styles.table}>
          <tbody>
            <ParentTable events={events} event={event} locale={locale} />
          </tbody>
        </table>
      </main>
      <aside>
        {event && event.moderators?.length ? (
          <>
            <h4>
              {(() => {
                if (event.type === 'session') {
                  return <>{t('labelParticipantes.chairs')}</>;
                } else if (event.type === 'palestra' || event.type === 'painel' || event.type === 'tutorial') {
                  return <>{t('labelParticipantes.moderators')}</>;
                } else if (event.type === 'artigo') {
                  return <>{t('labelParticipantes.chairs')}</>;
                }
                return <></>;
              })()}
            </h4>
            <div className={styles['content__images']}>
              {event.moderators.map(
                (participant, index) =>
                  typeof participant === 'object' &&
                  participant !== null &&
                  !Array.isArray(participant) &&
                  participant.name && (
                    <SpeakerCard key={index} speaker={participant} size={100}>
                      <h6>{participant.name}</h6>
                      <p className='text-secondary'>{participant.institution}</p>
                      <p>{participant.bio}</p>
                    </SpeakerCard>
                  ),
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        {event && event.participants.length ? (
          <>
            <h4>
              {(() => {
                if (event.type === 'session') {
                  return <>{t('labelParticipantes.coordenadores')}</>;
                } else if (event.type === 'palestra' || event.type === 'painel' || event.type === 'tutorial') {
                  return <>{t('labelParticipantes.palestrantes')}</>;
                } else if (event.type === 'artigo') {
                  return <>{t('labelParticipantes.autores')}</>;
                }
                return <></>;
              })()}
            </h4>
            <div className={styles['content__images']}>
              {event.participants.map(
                (participant, index) =>
                  typeof participant === 'object' &&
                  participant !== null &&
                  !Array.isArray(participant) &&
                  participant.name && (
                    <SpeakerCard key={index} speaker={participant} size={100}>
                      <h6>{participant.name}</h6>
                      <p className='text-secondary'>{participant.institution}</p>
                      <p>{participant.bio}</p>
                    </SpeakerCard>
                  ),
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </aside>
      <hr />
    </section>
  );
}
