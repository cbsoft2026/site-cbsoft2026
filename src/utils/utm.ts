export function withUTM(url: string, content?: string) {
  const u = new URL(url);

  u.searchParams.set('utm_source', 'cbsoft');
  u.searchParams.set('utm_medium', 'referral');
  u.searchParams.set('utm_campaign', 'workshops_2026');

  if (content) {
    u.searchParams.set('utm_content', content);
  }

  return u.toString();
}
