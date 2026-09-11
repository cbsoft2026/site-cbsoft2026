import { Event } from '@/types/event';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFile, faFilePowerpoint } from '@fortawesome/free-regular-svg-icons';
import { getTranslations } from 'next-intl/server';
import SpeakerCard from '@/components/SpeakerCard';
import TemplateMarkdown from '../TemplateMarkdown';
import { defaultLang } from '@/app/config/locales';

import Image from 'next/image';
import LinkLocale from '@/components/LinkLocale';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { withUTM } from '@/utils/utm';
import Heading from '../Heading';
import { slugify } from '@/utils/slugify';

type Props = {
  events: Record<string, Event>;
  event?: Event;
  locale: string;
  sort?: (a: Event, b: Event) => number;
};

type PropsExternalUrl = {
  locale: string;
  object: { [x: string]: string } | undefined;
  small?: boolean;
};

async function ExternalUrls({ locale, object, small = true }: PropsExternalUrl) {
  const t = await getTranslations({ locale, namespace: 'pages/schedule' });

  return (
    <div className={`${styles['external_urls']} ${small ? styles['small'] : ''}`}>
      {Object.entries(object || {}).map(([key, value]) => {
        switch (key) {
          case 'file_attached_url':
            return (
              <a
                key={key}
                target='_blank'
                rel='noopener noreferrer'
                href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/${value}`}
              >
                <FontAwesomeIcon icon={faFile} />
                {t('file_attached')}
              </a>
            );
          case 'slides_url':
            return (
              <a
                key={key}
                target='_blank'
                rel='noopener noreferrer'
                href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/${value}`}
              >
                <FontAwesomeIcon icon={faFilePowerpoint} />
                {t('slides')}
              </a>
            );
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
  );
}

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
            {parentEvent.badges || parentEvent.awards ? (
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
                {parentEvent.awards?.map((award) => {
                  return (
                    <span
                      key={award}
                      className={styles.tooltip}
                      data-tooltip={award}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/awards.webp`}
                        alt={award}
                        width={16}
                        height={16}
                        priority
                        style={{ height: '1em', width: 'auto' }}
                      />
                    </span>
                  );
                })}
                {parentEvent.badges?.map((badge) => {
                  return (
                    <LinkLocale key={badge} href={{ pathname: '/artifacts' }} locale={locale}>
                      <picture>
                        {(() => {
                          if (badge == 'available') {
                            return (
                              <span
                                className={styles.tooltip}
                                data-tooltip={commonT('artifacts_available')}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  marginLeft: '4px',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/artifacts/artifacts_available.webp`}
                                  alt={commonT('artifacts_available')}
                                  width={16}
                                  height={16}
                                  priority
                                  style={{ height: '1em', width: 'auto' }}
                                />
                              </span>
                            );
                          }
                          if (badge == 'functional') {
                            return (
                              <span
                                className={styles.tooltip}
                                data-tooltip={commonT('artifacts_functional')}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  marginLeft: '4px',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/artifacts/artifacts_functional.webp`}
                                  alt={commonT('artifacts_functional')}
                                  width={16}
                                  height={16}
                                  priority
                                  style={{ height: '1em', width: 'auto' }}
                                />
                              </span>
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
            <ExternalUrls locale={locale} object={parentEvent.metadata} />
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
                <header className={styles.header} id={slugify(title)}>
                  <Heading as='h1' anchor={slugify(title)}>
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
                  </Heading>

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
      {Object.keys(event?.metadata || {}).length > 0 && (
        <ExternalUrls locale={locale} object={event?.metadata} small={false} />
      )}
      <hr />
    </section>
  );
}
