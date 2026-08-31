import { Type, Static } from '@sinclair/typebox';

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

export const ScheduleSchema = Type.Object({
  track: Type.Optional(TrackType),
  schedule: Type.Optional(
    Type.Object({
      start: Type.String(),
      end: Type.String(),
    }),
  ),
  title: Type.String(),
  rooms: Type.Optional(Type.Array(Type.String(), { default: [] })),
  type: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),

  /* usar o padrao i18n como lang (pt, en) */
  lang: Type.Optional(Type.String()),

  /* link para uma página da conferência */
  url: Type.Optional(Type.String()),
});

export type Track = (typeof trackValues)[number];

export const SchedulesSchema = Type.Array(ScheduleSchema);

export type Schedule = Static<typeof ScheduleSchema>;
export type Schedules = Static<typeof SchedulesSchema>;
