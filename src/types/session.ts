import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';

export const SessionsSchema = Type.Array(
  Type.Object({
    chair: Type.Optional(Type.String()),
    ...ScheduleSchema.properties,
  }),
);

export type Sessions = Static<typeof SessionsSchema>;
