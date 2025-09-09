import { Type, Static } from '@sinclair/typebox';

export const TrackType = Type.Union([
  Type.Literal('pesquisa'),
  Type.Literal('ideias'),
  Type.Literal('tools'),
  Type.Literal('educacao'),
  Type.Literal('industry'),
  Type.Literal('ctd'),
  Type.Literal('ctic'),
  Type.Null(),
]);

export const trackValues = ['pesquisa', 'ideias', 'tools', 'educacao', 'industry', 'ctd', 'ctic'] as const;

export const PapersSchema = Type.Array(
  Type.Object({
    track: Type.Optional(TrackType),
    category: Type.String(),
    schedule: Type.Optional(
      Type.Object({
        session: Type.Integer(),
        start: Type.String(),
        end: Type.String(),
      }),
    ),
    title: Type.String(),
    authors: Type.String(),
  }),
);

export type Track = (typeof trackValues)[number];
export type Papers = Static<typeof PapersSchema>;
