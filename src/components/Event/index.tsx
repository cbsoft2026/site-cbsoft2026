import { Event } from '@/types/event';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { getTranslations } from 'next-intl/server';
import SpeakerCard from '@/components/SpeakerCard';
import TemplateMarkdown from '../TemplateMarkdown';
import { defaultLang } from '@/app/config/locales';

import Image from 'next/image';
import LinkLocale from '@/components/LinkLocale';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { withUTM } from '@/utils/utm';

type Props = {
  events: Record<string, Event>;
  event?: Event;
  locale: string;
  sort?: (a: Event, b: Event) => number;
};

async function ParentTable({ events, event, locale, sort }: Props) {
  const t = await getTranslations({ locale, namespace: 'pages/schedule' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  if (event?.type == 'info') return <></>;

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

  const sortedEvents = (event?.parentIds || Object.values(events))
    .map((parentId) => (typeof parentId === 'string' ? (events[parentId] as Event) : parentId))
    .sort((a, b) => {
      const result = sort?.(a, b) ?? 0;

      if (result !== 0) {
        return result;
      }

      return new Date(a.schedule?.start ?? '').getTime() - new Date(b.schedule?.start ?? '').getTime();
    });

  return sortedEvents.map(async (parentEvent, index) => {
    const scheduleT = await getTranslations('schedule');

    let title = parentEvent.title;

    if (scheduleT.has(parentEvent.title)) {
      title = scheduleT(parentEvent.title);
    }

    return (
      <tr key={index}>
        <th style={{ display: 'flex', minWidth: 150 }}>
          {parentEvent.schedule && parentEvent.schedule.start != parentEvent.schedule.end ? (
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
          <h6>
            {title}
            {parentEvent.badges ? (
              <span
                style={{
                  height: '1em',
                  verticalAlign: 'middle',
                  marginLeft: '4px',
                  paddingBottom: '4px',
                  userSelect: 'none',
                }}
              >
                {' '}
                {parentEvent.badges.map((badge) => {
                  return (
                    <LinkLocale key={badge} href={{ pathname: '/artifacts' }} locale={locale}>
                      <picture>
                        {(() => {
                          if (badge == 'available') {
                            return (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/artifacts/artifacts_available.webp`}
                                style={{ height: '1em', verticalAlign: 'middle', marginLeft: '4px' }}
                                alt='artifacts available'
                                width={16}
                                height={16}
                                priority
                              />
                            );
                          }
                          if (badge == 'functional') {
                            return (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/artifacts/artifacts_functional.webp`}
                                style={{ height: '1em', verticalAlign: 'middle', marginLeft: '4px' }}
                                alt='artifacts functional'
                                width={16}
                                height={16}
                                priority
                              />
                            );
                          }
                        })()}
                      </picture>
                    </LinkLocale>
                  );
                })}
              </span>
            ) : (
              ''
            )}
          </h6>
          <div className={styles['chips__grouped']} data-pagefind-ignore>
            {parentEvent.track ? (
              <span className={styles.chip}>
                <small>{commonT(`siglas.trilhas.${parentEvent.track}`)}</small>
              </span>
            ) : (
              ''
            )}
            {parentEvent.category && commonT.has(parentEvent.category) ? (
              <span className={styles.chip}>
                <small>{commonT(parentEvent.category)}</small>
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
          {Object.keys(parentEvent.metadata || {}).length > 0 && (
            <div className={styles['external_urls']}>
              {Object.entries(parentEvent.metadata || {}).map(([key, value]) => {
                switch (key) {
                  case 'artifact_url':
                    return (
                      <a key={key} target='_blank' rel='noopener noreferrer' href={withUTM(value)}>
                        <FontAwesomeIcon icon={faLink} />
                        {t('artifact')}
                      </a>
                    );
                }
                return null;
              })}
            </div>
          )}
        </td>
      </tr>
    );
  });
}

export default async function EventComponent({ events, event, locale, sort }: Props) {
  const t = await getTranslations({ locale, namespace: 'pages/schedule' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  return (
    <section className={`container ${styles['main-content']}`}>
      <main style={{ flexGrow: 1 }}>
        {(async () => {
          if (event) {
            const scheduleT = await getTranslations('schedule');

            let title = event.title;

            if (scheduleT.has(event.title)) {
              title = scheduleT(event.title);
            }

            return (
              <>
                <header className={styles.header}>
                  <h1>
                    {title}
                    {event.lang && event.lang != defaultLang ? (
                      <>
                        <picture>
                          <img
                            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/icon/${event.lang}.webp`}
                            width={40}
                            alt={event.lang}
                            style={{ minWidth: '40px' }}
                          />
                        </picture>
                      </>
                    ) : (
                      <></>
                    )}
                  </h1>

                  <div className={styles['chips__grouped']} data-pagefind-ignore>
                    {event.simposio ? (
                      <span className={styles.chip}>
                        <small>{commonT.has(event.simposio) ? commonT(event.simposio) : event.simposio}</small>
                      </span>
                    ) : (
                      ''
                    )}
                    {event.track ? (
                      <span className={styles.chip}>
                        <small>
                          {commonT.has(`siglas.trilhas.${event.track}`)
                            ? commonT(`siglas.trilhas.${event.track}`)
                            : event.track}
                        </small>
                      </span>
                    ) : (
                      ''
                    )}
                    {event.type ? (
                      <span className={styles.chip}>
                        <small>
                          {commonT.has(`eventos.${event.type}`) ? commonT(`eventos.${event.type}`) : event.type}
                        </small>
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

                {event.description ? <TemplateMarkdown>{event.description}</TemplateMarkdown> : ''}
              </>
            );
          }
        })()}

        <table className={styles.table}>
          <tbody>
            <ParentTable events={events} event={event} locale={locale} sort={sort} />
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
