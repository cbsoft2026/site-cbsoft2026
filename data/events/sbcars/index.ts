import { validateData } from '@data/validator';
import { Papers, PapersSchema } from '../../../src/types/papers';
import { Talks, TalksSchema } from '../../../src/types/talks';

export const getArtigos = async (lang: string) => {
  const basePath = `${lang}`;
  try {
    const artigos: Papers[] = (await import(`${basePath}/artigos.json`)).default;
    return validateData(PapersSchema, artigos, 'Artigos');
  } catch {}

  return [];
};

export const getPalestras = async (lang: string) => {
  const basePath = `${lang}`;
  try {
    const palestras: Talks[] = (await import(`${basePath}/palestras.json`)).default;
    return validateData(TalksSchema, palestras, 'Palestras');
  } catch {}

  return [];
};
