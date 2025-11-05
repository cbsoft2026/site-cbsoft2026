export function mapToObject<V>(map: Map<string | number | symbol, V>): Record<string | number | symbol, V> {
  return Object.fromEntries(Array.from(map.entries()).map(([k, set]) => [k, set]));
}
