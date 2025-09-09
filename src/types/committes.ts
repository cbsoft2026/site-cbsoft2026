import { Type, Static } from '@sinclair/typebox';

export const CommitteTypes = Type.Union([
  Type.Literal('coordenadores'),
  Type.Literal('comiteDiretivo'),
  Type.Literal('comitePrograma'),
]);

export const Committe = Type.String();

export const CommittesSchema = Type.Record(Type.String(), Type.Array(Type.String()));

export type CommitteTypes = Static<typeof CommitteTypes>;
export type Committe = Static<typeof Committe>;
export type Committes = Static<typeof CommittesSchema>;
