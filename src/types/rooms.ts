import { Type, Static } from '@sinclair/typebox';

export const Room = Type.Object({
  nome: Type.String(),
  label: Type.String(),
});

export const RoomsSchema = Type.Array(Room);

export type Room = Static<typeof Room>;
export type Rooms = Static<typeof RoomsSchema>;
