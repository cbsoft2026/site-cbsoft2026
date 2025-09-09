import { Type, Static } from '@sinclair/typebox';

export const Chair = Type.Object({
  name: Type.String(),
  university: Type.String(),
  image: Type.Optional(Type.String()),
  link: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
});

export const OrganizersSchema = Type.Array(
  Type.Object({
    category: Type.String(),
    subcategory: Type.Optional(Type.String()),
    chairs: Type.Array(Chair),
  }),
);

export type Chair = Static<typeof Chair>;
export type Organizers = Static<typeof OrganizersSchema>;
