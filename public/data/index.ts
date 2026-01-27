import { Organizers, OrganizersSchema } from '../../src/types/organizers';
import { Sponsors, SponsorsSchema } from '../../src/types/sponsors';
import { Accommodations, AccommodationsSchema } from '../../src/types/accommodation';
import { PreviousEditions, PreviousEditionsSchema } from '../../src/types/previousEditions';

import { validateData } from './validator';

import sponsorsJson from './sponsors.json';
import organizersJson from './organizers.json';
import accommodationJson from './accommodation.json';
import previousEditionsJson from '../generated/previous-editions.json'
import commonJson from './common.json'

export const sponsors: Sponsors = validateData(SponsorsSchema, sponsorsJson, 'Sponsors');

export const organizers: Organizers = validateData(OrganizersSchema, organizersJson, 'Organizers');

export const accommodations: Accommodations = validateData(AccommodationsSchema, accommodationJson, 'Accommodation');

export const previousEditions: PreviousEditions = validateData(PreviousEditionsSchema, previousEditionsJson, 'PreviousEditions');

export const common = commonJson

export { default as dates } from "../generated/shared/dates.json";
export { default as speakers } from "../generated/shared/speakers.json";