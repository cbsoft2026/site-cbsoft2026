import appConfig from '@/app/app.config';

export function withUTM(url: string, campaign?: string, content?: string) {
  const u = new URL(url);

  u.searchParams.set('utm_source', appConfig.conference.replaceAll(' ', '-').toLocaleLowerCase());
  u.searchParams.set('utm_medium', 'referral');

  if (campaign) {
    u.searchParams.set('utm_campaign', campaign);
  }

  if (content) {
    u.searchParams.set('utm_content', content);
  }

  return u.toString();
}
