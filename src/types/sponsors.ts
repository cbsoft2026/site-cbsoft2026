import { Type, Static } from '@sinclair/typebox';

export const Sponsor = Type.Object({
  tier: Type.Optional(
    Type.Union([Type.Literal('platina'), Type.Literal('ouro'), Type.Literal('prata'), Type.Literal('bronze')]),
  ),
  items: Type.Array(
    Type.Object({
      href: Type.String(),
      image: Type.String(),
    }),
  ),
});

export const SponsorsSchema = Type.Object({
  organizador: Type.Array(Sponsor),
  realizador: Type.Array(Sponsor),
  patrocinio: Type.Array(Sponsor),
  apoio: Type.Array(Sponsor),
});

export type Sponsor = Static<typeof Sponsor>;
export type Sponsors = Static<typeof SponsorsSchema>;
