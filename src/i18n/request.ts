import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
// import { LoadMessagesParamsNode, requestMessagesNode } from './requestNode';

export default getRequestConfig(async () => {
  let locale = routing.defaultLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    defaultLocale: routing.defaultLocale,
    messages: await requestMessages({ locale }),
    timeZone: 'America/Sao_Paulo',
  };
});

export type LoadMessagesParams = { locale: string };

export async function requestMessages(param: LoadMessagesParams) {
  return (await import(`../../public/generated/${param.locale}.json`)).default;
}
