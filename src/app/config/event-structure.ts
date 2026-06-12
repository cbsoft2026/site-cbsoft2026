export const programs = ['artifacts', 'high-school', 'latam-school', 'workshops', 'volunteers'] as const;

export const symposiums = ['sbcars', 'sast', 'sblp', 'sbes'] as const;

export const events = [...programs, ...symposiums] as const;

export type EventStructureType = (typeof events)[number];
