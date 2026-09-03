import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';

export const BadgeType = Type.Union([Type.Literal('available'), Type.Literal('functional')]);

export const badgeValues = ['available', 'functional'];

export const PaperSchema = Type.Object({
  category: Type.Optional(Type.String()),
  authors: Type.Array(Type.String()),
  badges: Type.Optional(Type.Array(BadgeType)),
  artifact: Type.Optional(Type.String({ pattern: '^https?://.+$' })),
  ...ScheduleSchema.properties,
});

export type Badge = (typeof badgeValues)[number];

export const PapersSchema = Type.Array(PaperSchema);

export type Paper = Static<typeof PaperSchema>;
export type Papers = Static<typeof PapersSchema>;
