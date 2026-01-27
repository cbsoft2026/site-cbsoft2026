import * as fs from 'fs';
import * as path from 'path';

import { PapersSchema, Track, trackValues } from '../types/papers';
import { TalksSchema } from '../types/talks';
import { validateData } from '../../public/data/validator';
import { slugify } from '../utils/slugify';
import { defaultLang, Locale } from '../types/locales';
import { Static, TSchema } from '@sinclair/typebox';
import { SessionsSchema } from '../types/session';
import { Participant, Participants } from '../types/participants';
import { Rooms } from '../types/rooms';
import { Event, Events, EventType } from '../types/event';

export const SYMPOSIUMS = ['sbcars', 'sast', 'sblp', 'sbes'];
export const WORKSHOPS = ['workshops'];
export const EVENTS_LIST = [...SYMPOSIUMS, ...WORKSHOPS, 'latam-school', 'artifacts'];

const BASE_PATH = path.join(process.cwd(), 'public/data/events');

export function loadParticipants(): Participants {
  const pessoasPath = path.join(BASE_PATH, '../generated/shared/speakers.json');
  if (!fs.existsSync(pessoasPath)) return [];
  return JSON.parse(fs.readFileSync(pessoasPath, 'utf-8'));
}

export function loadCommonEvents(lang: string = 'pt'): { salas: Rooms; startsInDate: string } {
  const pessoasPath = path.join(BASE_PATH, `../events/${lang}/schedule/common.json`);
  if (!fs.existsSync(pessoasPath)) return { salas: [], startsInDate: '' };
  return JSON.parse(fs.readFileSync(pessoasPath, 'utf-8'));
}

const getPathsToTry = (
  lang: string,
  slug: string,
  eventType: EventType | 'chamada',
  ext: string = 'json',
): { path: string; track: Track | null }[] => {
  return [
    ...trackValues.flatMap((track) => [
      { path: path.join(BASE_PATH, lang, slug, 'tracks', track, `${eventType}.${ext}`), track },
      { path: path.join(BASE_PATH, defaultLang, slug, 'tracks', track, `${eventType}.${ext}`), track },
    ]),
    { path: path.join(BASE_PATH, lang, slug, `${eventType}.${ext}`), track: null },
    { path: path.join(BASE_PATH, defaultLang, slug, `${eventType}.${ext}`), track: null },
  ];
};

export function loadEvent<T extends TSchema>(
  slug: string,
  eventType: EventType,
  schema: T,
  processFunc: (value: Static<T>) => void,
  lang = 'pt',
  name = 'VALIDATE_DATA',
) {
  const pathsToTry = getPathsToTry(lang, slug, eventType);

  for (const path of pathsToTry) {
    if (fs.existsSync(path.path)) {
      const value = JSON.parse(fs.readFileSync(path.path, 'utf-8'));
      return processFunc(validateData<T>(schema, value, name));
    }
  }

  return;
}

export function formatParticipants(
  listParticipants: { [key: string]: Participant },
  participantsIds: string[] | string,
): (Participant | string)[] {
  if (Array.isArray(participantsIds)) {
    return [
      ...participantsIds.map((participant) =>
        listParticipants[participant] ? listParticipants[participant] : participant,
      ),
    ];
  }
  if (participantsIds) {
    return [listParticipants[participantsIds]];
  }
  return [];
}

export function loadEvents(lang: string = 'pt'): Map<string, Event> {
  const participants: { [key: string]: Participant } = loadParticipants().reduce(
    (previous, value) => ({ ...previous, [value.id]: value }),
    {},
  );

  const events: Events = [];

  EVENTS_LIST.forEach((slug) => {
    const sessionMap: Events = [];

    loadEvent(
      slug,
      'session',
      SessionsSchema,
      (schedule) => {
        schedule.forEach((p) => {
          const id = slugify(p.title);
          const participantsSession = [];
          if (p.chair) participantsSession.push(participants[p.chair]);

          const sessionEvent: Event = {
            type: (p.type as EventType) || 'session',
            simposio: slug,
            id,
            track: null,
            schedule: p.schedule,
            rooms: p.rooms,
            title: p.title,
            description: p.description,
            participants: participantsSession,
            parentIds: [],
          };

          sessionMap.push(sessionEvent);
        });
      },
      lang,
    );

    loadEvent(
      slug,
      'artigo',
      PapersSchema,
      (schedule) => {
        schedule.forEach((p) => {
          const id = slugify(p.title);
          const participantsArticle = formatParticipants(participants, p.authors);
          if (p.chair) participantsArticle.push(participants[p.chair]);

          const parentSession = sessionMap.find((session) => {
            if (!p.schedule || !session.schedule) return false;
            const articleStart = new Date(p.schedule.start).getTime();
            const articleEnd = new Date(p.schedule.end).getTime();
            const sessionStart = new Date(session.schedule.start).getTime();
            const sessionEnd = new Date(session.schedule.end).getTime();
            const isParentSession = articleStart >= sessionStart && articleEnd <= sessionEnd;
            if (isParentSession) session.parentIds?.push(id);
            return isParentSession;
          });

          events.push({
            type: (p.type as EventType) || 'artigo',
            simposio: slug,
            id,
            track: p.track || '',
            schedule: p.schedule,
            rooms: p.rooms,
            title: p.title,
            description: p.description,
            participants: participantsArticle,
            parentIds: parentSession ? [parentSession.id] : [],
          });
        });
      },
      lang,
    );

    loadEvent(
      slug,
      'painel',
      TalksSchema,
      (schedule) => {
        schedule.forEach((p) => {
          const id = slugify(p.title);
          const participantsPainel = formatParticipants(participants, p.speakers);
          if (p.moderator) participantsPainel.push(participants[p.moderator]);

          events.push({
            type: (p.type as EventType) || 'painel',
            simposio: slug,
            id,
            track: null,
            schedule: p.schedule,
            rooms: p.rooms,
            title: p.title,
            description: p.description,
            participants: participantsPainel,
          });
        });
      },
      lang,
    );

    loadEvent(slug, 'tutorial', TalksSchema, (schedule) => {
      schedule.forEach((p) => {
        const id = slugify(p.title);
        const participantsSession = formatParticipants(participants, p.speakers);

        if (p.moderator) participantsSession.push(participants[p.moderator]);
        events.push({
          type: (p.type as EventType) || 'tutorial',
          simposio: slug,
          id,
          track: null,
          schedule: p.schedule,
          rooms: p.rooms,
          title: p.title,
          description: p.description,
          participants: participantsSession,
        });
      });
    });
    events.push(...Array.from(sessionMap.values()));

    loadEvent(slug, 'palestra', TalksSchema, (schedule) => {
      schedule.forEach((p) => {
        const id = slugify(p.title);
        const participantsSession = formatParticipants(participants, p.speakers);

        if (p.moderator) participantsSession.push(participants[p.moderator]);
        events.push({
          type: (p.type as EventType) || 'palestra',
          simposio: slug,
          id,
          track: null,
          schedule: p.schedule,
          rooms: p.rooms,
          title: p.title,
          description: p.description,
          participants: participantsSession,
        });
      });
    });
    events.push(...Array.from(sessionMap.values()));
  }, lang);

  const schedule = path.join(BASE_PATH, '../events/pt/schedule/schedules.json');
  if (fs.existsSync(schedule)) {
    let json = JSON.parse(fs.readFileSync(schedule, 'utf-8'));
    json = Object.keys(json).map((key) => {
      const value = json[key];
      value['id'] = slugify(value.title);

      return value;
    });
    events.push(...json);
  }

  const eventsById = new Map(events.map((e) => [e.id, e]));

  return eventsById;
}

export function loadCalls(lang: Locale = defaultLang, symposiums = EVENTS_LIST, tracks = trackValues) {
  const calls: Record<string, string> = {};
  symposiums.forEach((slug) => {
    const pathsToTry = getPathsToTry(lang, slug, 'chamada', 'md');
    (tracks.length > 0 ? tracks : [null]).forEach((track) => {
      let findPath = false;
      for (const path of pathsToTry) {
        if (fs.existsSync(path.path)) {
          const value = fs.readFileSync(path.path, 'utf-8');
          if (path.track == track && path.path.includes(lang)) {
            calls[`${slug}_${track}_${lang}`] = value;
            findPath = true;
            break;
          }
        }
      }
      if (!findPath) {
        for (const path of pathsToTry) {
          if (fs.existsSync(path.path)) {
            const value = fs.readFileSync(path.path, 'utf-8');
            if (path.path.includes(lang)) {
              calls[`${slug}_${lang}`] = value;
              findPath = true;
              break;
            }
          }
        }
      }
      if (!findPath) {
        for (const path of pathsToTry) {
          if (fs.existsSync(path.path)) {
            const value = fs.readFileSync(path.path, 'utf-8');
            calls[`${slug}_${lang}`] = value;
          }
        }
      }
    });
  });
  return calls;
}

export function loadTracks(symposium: string, lang: Locale = defaultLang) {
  if (fs.existsSync(path.join(BASE_PATH, lang, symposium, 'tracks'))) {
    const dirents = fs.readdirSync(path.join(BASE_PATH, lang, symposium, 'tracks'), { withFileTypes: true });
    const folders = dirents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    if (folders) return folders;
  }
  return [];
}
