import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';

export const PaperSchema = Type.Object({
  category: Type.Optional(Type.String()),
  authors: Type.Array(Type.String()),
  badges: Type.Optional(Type.Array(Type.String())),
  ...ScheduleSchema.properties,
});

export const PapersSchema = Type.Array(PaperSchema);

export type Paper = Static<typeof PaperSchema>;
export type Papers = Static<typeof PapersSchema>;
