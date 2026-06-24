export const programs = [
  { slug: 'artifacts', type: 'internal' },
  { slug: 'high-school', type: 'internal' },
  { slug: 'latam-school', type: 'internal' },
  { slug: 'workshops', type: 'internal' },
  { slug: 'volunteers', type: 'internal' },
  { slug: 'aiware', type: 'external', url: 'https://aiware-latam.github.io/' },
] as const;

export const symposiums = ['sbcars', 'sast', 'sblp', 'sbes'] as const;

export const events = [...programs.map((program) => program.slug), ...symposiums] as const;

export type EventStructureType = (typeof events)[number];
