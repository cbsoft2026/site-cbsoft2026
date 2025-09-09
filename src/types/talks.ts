import { Type, Static } from '@sinclair/typebox';

export const TalksSchema = Type.Array(
  Type.Object({
    moderator: Type.Optional(Type.String()),
    speakers: Type.Array(Type.String()),
    title: Type.String(),
    abstract: Type.String(),
    schedule: Type.Optional(
      Type.Object({
        start: Type.String(),
        end: Type.String(),
      }),
    ),
  }),
);

export type Talks = Static<typeof TalksSchema>;
