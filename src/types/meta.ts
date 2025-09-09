import { Type, Static } from '@sinclair/typebox';

export const Meta = Type.Object({
  slug: Type.String(),
  name: Type.String(),
});

export type Meta = Static<typeof Meta>;
