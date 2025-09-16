import fs from 'fs';
import path from 'path';

import { Track, trackValues } from '../types/papers';
import { TalksSchema } from '../types/talks';
import { validateData } from '@/data/validator';
import { slugify } from '@/utils/slugify';
import { defaultLang } from '@/types/locales';
import { Static, TSchema } from '@sinclair/typebox';
import { SessionsSchema } from '@/types/session';
import { Participant, Participants } from '@/types/participants';
import { Rooms } from '@/types/rooms';
import { Events, EventType } from '@/types/event';

export const SIMPOSIOS = ['sbcars', 'sast', 'sblp', 'sbes', 'industry-track', 'mssis', 'vem', 'latam-school'];

const BASE_PATH = path.join(process.cwd(), 'data/events');

function getPath(slug: string, lang: string, eventType: EventType) {
  const ext = 'json';
  //if (eventType === 'chamada') ext = 'md';

  const __path = path.join(BASE_PATH, lang, slug, `${eventType}.${ext}`);

  if (fs.existsSync(__path)) return [{ path: __path, track: null }];

  const __fallback = path.join(BASE_PATH, defaultLang, slug, `${eventType}.${ext}`);
  if (fs.existsSync(__path)) return [{ path: __fallback, track: null }];

  const __fallbackByTracks = trackValues
    .map((track) => {
      const __path = path.join(BASE_PATH, lang, slug, 'tracks', track, `${eventType}.${ext}`);

      if (fs.existsSync(__path)) return { path: __path, track: track };

      const __fallback = path.join(BASE_PATH, defaultLang, slug, 'tracks', track, `${eventType}.${ext}`);
      if (fs.existsSync(__path)) return { path: __fallback, track: track };
    })
    .filter((x): x is { path: string; track: Track } => !!x);

  return __fallbackByTracks;
}

// export function loadProgramacao(lang: Locale = defaultLang): Evento[] {
//   const eventos: Evento[] = [];

//   SIMPOSIOS.forEach((slug) => {
//     const artigosPaths = getPath(slug, lang, 'artigo');
//     artigosPaths.map((pathInfo) => {
//       if (!pathInfo) return;

//       const artigos = validateData(PapersSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Artigos');
//       artigos.forEach((a: any) => {
//         const id = slugify(a.title || a.name || a.id);
//         eventos.push({ ...a, tipo: 'artigo', simposio: slug, id, track: pathInfo.track });
//       });
//     });

//     const palestrasPath = getPath(slug, lang, 'palestra');
//     palestrasPath.map((pathInfo) => {
//       if (!pathInfo) return;

//       const palestras = validateData(TalksSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Palestras');
//       palestras.forEach((p: any) => {
//         const id = slugify(p.title || p.name || p.id);
//         eventos.push({ ...p, tipo: 'palestra', simposio: slug, id, track: pathInfo.track });
//       });
//     });

//     const toturialPath = getPath(slug, lang, 'tutorial');
//     toturialPath.map((pathInfo) => {
//       if (!pathInfo) return;

//       const tutorials = validateData(TalksSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Painel');
//       tutorials.forEach((p: any) => {
//         const id = slugify(p.title || p.name || p.id);
//         eventos.push({ ...p, tipo: 'tutorial', simposio: slug, id, track: pathInfo.track });
//       });
//     });

//     const chamadaPath = getPath(slug, lang, 'chamada');
//     chamadaPath.map((pathInfo) => {
//       if (!pathInfo) return;

//       const content = fs.readFileSync(pathInfo.path, 'utf-8');
//       const id = slugify(slug);
//       eventos.push({
//         id,
//         tipo: 'chamada',
//         simposio: slug,
//         content,
//         title: 'Chamada de Trabalho',
//         track: pathInfo.track,
//       });
//     });
//   });

//   return eventos;
// }

// export async function loadEventoDetalhado(
//   slug: string,
//   tipo: TipoEvento,
//   id?: string,
//   lang: Locale = defaultLang,
// ): Promise<Evento | null> {
//   const basePath = `../data/events/${slug}/${lang}`;

//   const fileMap = {
//     artigo: 'artigos.json',
//     palestra: 'palestras.json',
//     chamada: 'chamada.md',
//     painel: 'painel.json',
//     tutorial: 'tutorial.json',
//   };
//   try {
//     const items: any[] = (await import(`${basePath}/${fileMap[tipo]}`)).default;
//     const item = items.find((i) => i.id === id);
//     if (!item) return null;
//     return { ...item, tipo, simposio: slug };
//   } catch {
//     return null;
//   }
// }

// export function loadChamada(slug: string, track: Track | undefined, lang: Locale = defaultLang): string {
//   const chamadaPaths = getPath(slug, lang, 'chamada');
//   const chamadaPath = chamadaPaths.filter((pathInfo) => {
//     if (track) {
//       if (pathInfo.track == track) {
//         return pathInfo;
//       }
//     } else {
//       return pathInfo;
//     }
//   });

//   return fs.readFileSync(chamadaPath[0].path, 'utf-8');
// }

// export function loadMeta(slug: string, lang: Locale = defaultLang): any {
//   const filePath = path.join(BASE_PATH, slug, lang, 'meta.json');

//   if (fs.existsSync(filePath)) {
//     const fileContents = fs.readFileSync(filePath, 'utf-8');
//     try {
//       return JSON.parse(fileContents);
//     } catch (err) {
//       console.error('Erro meta.json:', err);
//       return null;
//     }
//   }

//   const fallback = path.join(BASE_PATH, slug, defaultLang, 'meta.json');
//   if (fs.existsSync(fallback)) {
//     const fileContents = fs.readFileSync(fallback, 'utf-8');
//     try {
//       return JSON.parse(fileContents);
//     } catch (err) {
//       console.error('Erro meta.json:', err);
//       return null;
//     }
//   } else {
//     return '';
//   }
// }

export function loadParticipants(): Participants {
  const pessoasPath = path.join(BASE_PATH, '../shared/speakers.json');
  if (!fs.existsSync(pessoasPath)) return [];
  return JSON.parse(fs.readFileSync(pessoasPath, 'utf-8'));
}

export function loadCommonEvents(): { salas: Rooms; startsInDate: string } {
  const pessoasPath = path.join(BASE_PATH, '../events/pt/schedule/common.json');
  if (!fs.existsSync(pessoasPath)) return { salas: [], startsInDate: '' };
  return JSON.parse(fs.readFileSync(pessoasPath, 'utf-8'));
}

export function loadEvent<T extends TSchema>(
  slug: string,
  eventType: EventType,
  schema: T,
  processFunc: (value: Static<T>) => void,
  lang = 'pt',
  name = 'VALIDATE_DATA',
) {
  const valuesPath = getPath(slug, lang, eventType);
  valuesPath.map((pathInfo) => {
    if (!pathInfo) return;

    const values = validateData<T>(schema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), name);
    return processFunc(values);
  });
}

export function formatParticipants(
  listParticipants: { [key: string]: Participant },
  participantsIds: string[] | string,
) {
  if (Array.isArray(participantsIds)) {
    return [...participantsIds.map((participant) => listParticipants[participant])].filter(
      (participant) => participant != null,
    );
  }
  if (participantsIds) {
    return [listParticipants[participantsIds]];
  }
  return [];
}

export function loadEvents() {
  const participants: { [key: string]: Participant } = loadParticipants().reduce(
    (previous, value) => ({ ...previous, [value.id]: value }),
    {},
  );

  const events: Events = [];
  SIMPOSIOS.forEach((slug) => {
    loadEvent(slug, 'painel', TalksSchema, (painels) => {
      painels.forEach((p) => {
        const id = slugify(p.title);
        const participantsPainel = formatParticipants(participants, p.speakers);
        if (p.moderator) participantsPainel.push(participants[p.moderator]);
        events.push({
          type: 'painel',
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
    });
    loadEvent(slug, 'session', SessionsSchema, (schedule) => {
      schedule.forEach((p) => {
        const id = slugify(p.title);
        const participantsSession = [];
        if (p.chair) participantsSession.push(participants[p.chair]);
        events.push({
          type: (p.type as EventType) || 'session',
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
  });

  const schedule = path.join(BASE_PATH, '../events/pt/schedule/schedules.json');
  if (!fs.existsSync(schedule)) return events;
  events.push(...JSON.parse(fs.readFileSync(schedule, 'utf-8')));

  return events;
}
