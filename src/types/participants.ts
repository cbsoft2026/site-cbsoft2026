import { Type, Static } from '@sinclair/typebox';

export const Participant = Type.Object({
  id: Type.String(),
  image: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  institution: Type.Optional(Type.String()),
  bio: Type.Optional(Type.String()),
});

export const ParticipantsSchema = Type.Array(Participant);

export type Participant = Static<typeof Participant>;
export type Participants = Static<typeof ParticipantsSchema>;
