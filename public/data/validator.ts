import { Value } from '@sinclair/typebox/value';
import { TSchema } from '@sinclair/typebox';

export function validateData<T extends TSchema>(schema: T, data: unknown, name = 'Data') {
  const isValid = Value.Check(schema, data);
  if (!isValid) {
    const errors = [...Value.Errors(schema, data)];
    console.error(`Erros de validação em ${name}:`, errors);
    throw new Error(`${name} inválido!`);
  }
  return Value.Cast(schema, data);
}
