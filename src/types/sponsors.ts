import { Type, Static } from '@sinclair/typebox';

export const Sponsor = Type.Object({
  href: Type.String(),
  image: Type.String(),
  tier: Type.Optional(
    Type.Union([Type.Literal('platina'), Type.Literal('ouro'), Type.Literal('prata'), Type.Literal('bronze')]),
  ),
});

export const SponsorsSchema = Type.Object({
  organizadores: Type.Array(Sponsor),
  realizacao: Type.Array(Sponsor),
  patrocinio: Type.Array(Sponsor),
  apoio: Type.Array(Sponsor),
});

export type Sponsor = Static<typeof Sponsor>;
export type Sponsors = Static<typeof SponsorsSchema>;
