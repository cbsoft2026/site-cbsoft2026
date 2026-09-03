import { Type, Static } from '@sinclair/typebox';
import { ScheduleSchema } from './schedule';
import { ParticipantSchema } from './participants';
import { BadgeType } from './papers';

export const EventType = Type.Union([
  Type.Literal('info'),
  Type.Literal('palestra'),
  Type.Literal('painel'),
  Type.Literal('tutorial'),
  Type.Literal('session'),
  Type.Literal('artigo'),
  Type.Null(),
]);

export const eventType = ['info', 'palestra', 'painel', 'tutorial', 'session', 'artigo', null] as const;

export const MetadataType = Type.Record(Type.String(), Type.Union([Type.String()]));

export const EventSchema = Type.Object({
  ...ScheduleSchema.properties,
  id: Type.String(),
  type: EventType,
  simposio: Type.String(),
  participants: Type.Array(Type.Union([ParticipantSchema, Type.String()])),
  moderators: Type.Optional(Type.Array(Type.Union([ParticipantSchema, Type.String()]))),
  content: Type.Optional(Type.String()),
  track: Type.Union([Type.Null(), Type.String()]),
  parentIds: Type.Optional(Type.Array(Type.String())),
  category: Type.Optional(Type.String()),
  badges: Type.Optional(Type.Array(BadgeType)),
  metadata: Type.Optional(MetadataType),
});

export const EventsSchema = Type.Array(EventSchema);

export type MetadataType = Static<typeof MetadataType>;

export type EventType = Static<typeof EventType>;
export type Event = Static<typeof EventSchema>;
export type Events = Static<typeof EventsSchema>;
