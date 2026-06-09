import { Type, Static } from '@sinclair/typebox';

export const PreviousEdition = Type.Object({
  year: Type.String(),
  url: Type.String(),
  proceedings: Type.Optional(Type.String()),
  local: Type.String(),
  online: Type.Optional(Type.Boolean()),
});

export const PreviousEditionsSchema = Type.Array(PreviousEdition);

export type PreviousEdition = Static<typeof PreviousEdition>;
export type PreviousEditions = Static<typeof PreviousEditionsSchema>;
