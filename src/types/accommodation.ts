import { Type, Static } from '@sinclair/typebox';

export const Accommodation = Type.Object({
  nome: Type.String(),
  endereco: Type.String(),
  mapa: Type.String(),
  distancia: Type.String(),
  recomendado: Type.Boolean(),
  precoLocal: Type.String(),
  valores: Type.Array(Type.String()),
});

export const AccommodationsSchema = Type.Array(Accommodation);

export type Accommodation = Static<typeof Accommodation>;
export type Accommodations = Static<typeof AccommodationsSchema>;
