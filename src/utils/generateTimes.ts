export default function generateTimes(start: Date, finish: Date, intervalMinutes: number): Date[] {
  const intervalMs = intervalMinutes * 60_000;
  const length = Math.ceil((finish.getTime() - start.getTime()) / intervalMs) + 1;
  return Array.from({ length }, (_, i) => new Date(start.getTime() + i * intervalMs));
}
