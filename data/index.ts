import { Organizers, OrganizersSchema } from '@/types/organizers';
import { Sponsors, SponsorsSchema } from '@/types/sponsors';
import { Accommodations, AccommodationsSchema } from '@/types/accommodation';
import { PreviousEditions, PreviousEditionsSchema } from '@/types/previousEditions';

import { validateData } from './validator';

import sponsorsJson from './sponsors.json';
import organizersJson from './organizers.json';
import accommodationJson from './accommodation.json';
import previousEditionsJson from './previous-editions.json'

export const sponsors: Sponsors = validateData(SponsorsSchema, sponsorsJson, 'Sponsors');

export const organizers: Organizers = validateData(OrganizersSchema, organizersJson, 'Organizers');

export const accommodations: Accommodations = validateData(AccommodationsSchema, accommodationJson, 'Accommodation');

export const previousEditions: PreviousEditions = validateData(PreviousEditionsSchema, previousEditionsJson, 'PreviousEditions');