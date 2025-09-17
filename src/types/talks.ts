import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';

export const TalksSchema = Type.Array(
  Type.Object({
    moderator: Type.Optional(Type.String()),
    speakers: Type.Array(Type.String()),
    ...ScheduleSchema.properties,
  }),
);

export type Talks = Static<typeof TalksSchema>;
