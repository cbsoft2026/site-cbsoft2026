import { Organizers, OrganizersSchema } from '@/types/organizers';
import { Sponsors, SponsorsSchema } from '@/types/sponsors';

import { validateData } from './validator';

import sponsorsJson from './sponsors.json';
import organizersJson from './organizers.json';

export const sponsors: Sponsors = validateData(SponsorsSchema, sponsorsJson, 'Sponsors');

export const organizers: Organizers = validateData(OrganizersSchema, organizersJson, 'Organizers');
