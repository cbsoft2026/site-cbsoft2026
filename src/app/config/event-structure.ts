export const programs = [
  { slug: 'artifacts', type: 'internal' },
  { slug: 'high-school', type: 'internal' },
  { slug: 'latam-school', type: 'internal' },
  { slug: 'workshops', type: 'internal' },
  { slug: 'volunteers', type: 'internal' },
  { slug: 'special-activities', type: 'internal' },
  { slug: 'software-livre', type: 'internal' },
  { slug: 'aiware', type: 'external', url: 'https://aiware-latam.github.io/' },
  {
    slug: 'women-lunch',
    type: 'external',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSemS283uGw_WkDtxYm-8ZDEtUR5ppA3RYgEsZvRFDhczBwuMg/viewform',
  },
] as const;

export const symposiums = ['sbcars', 'sast', 'sblp', 'sbes'] as const;

export const events = [...programs.map((program) => program.slug), ...symposiums] as const;

export type EventStructureType = (typeof events)[number];
