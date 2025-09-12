import { Organizers, OrganizersSchema } from '@/types/organizers';
import { Sponsors, SponsorsSchema } from '@/types/sponsors';
import { Accommodations, AccommodationsSchema } from '@/types/accommodation';

import { validateData } from './validator';

import sponsorsJson from './sponsors.json';
import organizersJson from './organizers.json';
import accommodationJson from './accommodation.json';

export const sponsors: Sponsors = validateData(SponsorsSchema, sponsorsJson, 'Sponsors');

export const organizers: Organizers = validateData(OrganizersSchema, organizersJson, 'Organizers');

export const accommodations: Accommodations = validateData(AccommodationsSchema, accommodationJson, 'Accommodation');