import { Sponsor } from '../types/sponsors';

const tierOrder: Record<NonNullable<Sponsor['tier']>, number> = {
  platina: 1,
  ouro: 2,
  prata: 3,
  bronze: 4,
};

export function sortSponsorsByTier(sponsors: Sponsor[]): Sponsor[] {
  return [...sponsors].sort((a, b) => {
    const orderA = a.tier ? tierOrder[a.tier] : Number.MAX_SAFE_INTEGER;
    const orderB = b.tier ? tierOrder[b.tier] : Number.MAX_SAFE_INTEGER;

    return orderA - orderB;
  });
}

export function groupSponsorsByTier(sponsors: Sponsor[]) {
  return Object.keys(tierOrder)
    .map((tier) => ({
      tier,
      items: sponsors.filter((sponsor) => sponsor.tier === tier),
    }))
    .filter((group) => group.items.length > 0);
}
