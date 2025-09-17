import { Type, Static } from '@sinclair/typebox';

export const ParticipantSchema = Type.Object({
  id: Type.String(),
  image: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  institution: Type.Optional(Type.String()),
  bio: Type.Optional(Type.String()),
});

export const ParticipantsSchema = Type.Array(ParticipantSchema);

export type Participant = Static<typeof ParticipantSchema>;
export type Participants = Static<typeof ParticipantsSchema>;
