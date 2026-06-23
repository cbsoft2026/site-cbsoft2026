import { Static, Type } from '@sinclair/typebox';

export const ActivitySchema = Type.Object({
  date: Type.String(),
  history: Type.Optional(Type.Array(Type.String())),
  label: Type.Optional(
    Type.Object({
      pt: Type.String(),
      en: Type.String(),
    }),
  ),
});

export const DatesDataSchema = Type.Record(Type.String(), Type.Record(Type.String(), ActivitySchema));

export type Activity = Static<typeof ActivitySchema>;
export type DatesData = Static<typeof DatesDataSchema>;
