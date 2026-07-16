import { Type, Static } from '@sinclair/typebox';

export const ScheduleSchema = Type.Object({
  schedule: Type.Optional(
    Type.Object({
      start: Type.String(),
      end: Type.String(),
    }),
  ),
  title: Type.String(),
  rooms: Type.Optional(Type.Array(Type.String(), { default: [] })),
  type: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
});

export const SchedulesSchema = Type.Array(ScheduleSchema);

export type Schedule = Static<typeof ScheduleSchema>;
export type Schedules = Static<typeof SchedulesSchema>;
