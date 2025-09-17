import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';

export const SessionSchema = Type.Object({
  chair: Type.Optional(Type.String()),
  ...ScheduleSchema.properties,
});

export const SessionsSchema = Type.Array(SessionSchema);

export type Session = Static<typeof SessionSchema>;
export type Sessions = Static<typeof SessionsSchema>;
