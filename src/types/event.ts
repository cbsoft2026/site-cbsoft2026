import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';
import { ParticipantsSchema } from './participants';

export const EventType = Type.Union([
  Type.Literal('info'),
  Type.Literal('artigo'),
  Type.Literal('palestra'),
  Type.Literal('chamada'),
  Type.Literal('painel'),
  Type.Literal('tutorial'),
  Type.Literal('session'),
  Type.Null(),
]);

export const eventType = ['info', 'artigo', 'palestra', 'chamada', 'painel', 'tutorial', 'session', null] as const;

export const EventSchema = Type.Object({
  ...ScheduleSchema.properties,
  id: Type.String(),
  type: EventType,
  simposio: Type.String(),
  participants: ParticipantsSchema,
  content: Type.Optional(Type.String()),
  track: Type.Union([Type.Null(), Type.String()]),
});

export const EventsSchema = Type.Array(EventSchema);

export type EventType = Static<typeof EventType>;
export type Event = Static<typeof EventSchema>;
export type Events = Static<typeof EventsSchema>;
