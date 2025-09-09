import fs from 'fs';
import path from 'path';

import { PapersSchema, Track, trackValues } from '../types/papers';
import { TalksSchema } from '../types/talks';
import { validateData } from '@/data/validator';
import { slugify } from '@/utils/slugify';

export type TipoEvento = 'artigo' | 'palestra' | 'chamada' | 'painel' | 'tutorial';

export type Evento = {
  id: string;
  title?: string;
  tipo: TipoEvento;
  simposio: string;
  authors?: string[];
  speakers?: string[];
  content?: string;
  track: string | null;
};

const SIMPOSIOS = ['sbcars', 'sast', 'sblp', 'sbes'];
const DEFAULT_LANG = 'pt';

const BASE_PATH = path.join(process.cwd(), 'data/events');

function getPath(slug: string, lang: string, eventType: TipoEvento) {
  let ext = 'json';
  if (eventType === 'chamada') ext = 'md';

  const __path = path.join(BASE_PATH, slug, lang, `${eventType}.${ext}`);

  if (fs.existsSync(__path)) return [{ path: __path, track: null }];

  const __fallback = path.join(BASE_PATH, slug, DEFAULT_LANG, `${eventType}.${ext}`);
  if (fs.existsSync(__path)) return [{ path: __fallback, track: null }];

  const __fallbackByTracks = trackValues
    .map((track) => {
      const __path = path.join(BASE_PATH, slug, lang, 'tracks', track, `${eventType}.${ext}`);

      if (fs.existsSync(__path)) return { path: __path, track: track };

      const __fallback = path.join(BASE_PATH, slug, DEFAULT_LANG, 'tracks', track, `${eventType}.${ext}`);
      if (fs.existsSync(__path)) return { path: __fallback, track: track };
    })
    .filter((x): x is { path: string; track: Track } => !!x);

  return __fallbackByTracks;
}

export function loadProgramacao(lang: 'pt' | 'en' = DEFAULT_LANG): Evento[] {
  const eventos: Evento[] = [];

  SIMPOSIOS.forEach((slug) => {
    const artigosPaths = getPath(slug, lang, 'artigo');
    artigosPaths.map((pathInfo) => {
      if (!pathInfo) return;

      const artigos = validateData(PapersSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Artigos');
      artigos.forEach((a: any) => {
        const id = slugify(a.title || a.name || a.id);
        eventos.push({ ...a, tipo: 'artigo', simposio: slug, id, track: pathInfo.track });
      });
    });

    const palestrasPath = getPath(slug, lang, 'palestra');
    palestrasPath.map((pathInfo) => {
      if (!pathInfo) return;

      const palestras = validateData(TalksSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Palestras');
      palestras.forEach((p: any) => {
        const id = slugify(p.title || p.name || p.id);
        eventos.push({ ...p, tipo: 'palestra', simposio: slug, id, track: pathInfo.track });
      });
    });

    const painelPath = getPath(slug, lang, 'painel');
    painelPath.map((pathInfo) => {
      if (!pathInfo) return;

      const paineis = validateData(TalksSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Painel');
      paineis.forEach((p: any) => {
        const id = slugify(p.title || p.name || p.id);
        eventos.push({ ...p, tipo: 'painel', simposio: slug, id, track: pathInfo.track });
      });
    });

    const toturialPath = getPath(slug, lang, 'tutorial');
    toturialPath.map((pathInfo) => {
      if (!pathInfo) return;

      const tutorials = validateData(TalksSchema, JSON.parse(fs.readFileSync(pathInfo.path, 'utf-8')), 'Painel');
      tutorials.forEach((p: any) => {
        const id = slugify(p.title || p.name || p.id);
        eventos.push({ ...p, tipo: 'tutorial', simposio: slug, id, track: pathInfo.track });
      });
    });

    const chamadaPath = getPath(slug, lang, 'chamada');
    chamadaPath.map((pathInfo) => {
      if (!pathInfo) return;

      const content = fs.readFileSync(pathInfo.path, 'utf-8');
      const id = slugify(slug);
      eventos.push({
        id,
        tipo: 'chamada',
        simposio: slug,
        content,
        title: 'Chamada de Trabalho',
        track: pathInfo.track,
      });
    });
  });

  return eventos;
}

export async function loadEventoDetalhado(
  slug: string,
  tipo: TipoEvento,
  id?: string,
  lang: 'pt' | 'en' = DEFAULT_LANG,
): Promise<Evento | null> {
  const basePath = `../data/events/${slug}/${lang}`;

  const fileMap = {
    artigo: 'artigos.json',
    palestra: 'palestras.json',
    chamada: 'chamada.md',
    painel: 'painel.json',
    tutorial: 'tutorial.json',
  };
  try {
    const items: any[] = (await import(`${basePath}/${fileMap[tipo]}`)).default;
    const item = items.find((i) => i.id === id);
    if (!item) return null;
    return { ...item, tipo, simposio: slug };
  } catch {
    return null;
  }
}

export function loadChamada(slug: string, track: Track | undefined, lang: 'pt' | 'en' = 'pt'): string {
  const chamadaPaths = getPath(slug, lang, 'chamada');
  const chamadaPath = chamadaPaths.filter((pathInfo) => {
    if (track) {
      if (pathInfo.track == track) {
        return pathInfo;
      }
    } else {
      return pathInfo;
    }
  });

  return fs.readFileSync(chamadaPath[0].path, 'utf-8');
}

export function loadMeta(slug: string, lang: 'pt' | 'en' = 'pt'): any {
  const filePath = path.join(BASE_PATH, slug, lang, 'meta.json');

  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    try {
      return JSON.parse(fileContents);
    } catch (err) {
      console.error('Erro meta.json:', err);
      return null;
    }
  }

  const fallback = path.join(BASE_PATH, slug, 'pt', 'meta.json');
  if (fs.existsSync(fallback)) {
    const fileContents = fs.readFileSync(fallback, 'utf-8');
    try {
      return JSON.parse(fileContents);
    } catch (err) {
      console.error('Erro meta.json:', err);
      return null;
    }
  } else {
    return '';
  }
}

export function loadPessoas(): any[] {
  const pessoasPath = path.join(BASE_PATH, '../shared/speakers.json');
  if (!fs.existsSync(pessoasPath)) return [];
  return JSON.parse(fs.readFileSync(pessoasPath, 'utf-8'));
}
