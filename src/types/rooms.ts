import { Type, Static } from '@sinclair/typebox';

export const Room = Type.Object({
  label: Type.String(),
  nome: Type.String(),
  local: Type.String(),
});

export const RoomsSchema = Type.Array(Room);

export type Room = Static<typeof Room>;
export type Rooms = Static<typeof RoomsSchema>;
