import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';

export const TrackType = Type.Union([
  Type.Literal('pesquisa'),
  Type.Literal('ideias'),
  Type.Literal('tools'),
  Type.Literal('educacao'),
  Type.Literal('industry'),
  Type.Literal('ctd'),
  Type.Literal('ctic'),
  Type.Literal('special'),
  Type.Null(),
]);

export const trackValues = ['pesquisa', 'educacao', 'ideias', 'tools', 'ctic', 'ctd', 'industry', 'special'];

export const PaperSchema = Type.Object({
  track: Type.Optional(TrackType),
  category: Type.String(),
  authors: Type.Array(Type.String()),
  chair: Type.String(),
  badges: Type.Optional(Type.Array(Type.String())),
  ...ScheduleSchema.properties,
});

export const PapersSchema = Type.Array(PaperSchema);

export type Track = (typeof trackValues)[number];
export type Paper = Static<typeof PaperSchema>;
export type Papers = Static<typeof PapersSchema>;
