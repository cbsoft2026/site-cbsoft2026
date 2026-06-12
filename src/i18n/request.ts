import { getRequestConfig, GetRequestConfigParams, RequestConfig } from 'next-intl/server';
import { routing } from './routing';
import appConfig from '@/app/app.config';

type Locales = (typeof routing.locales)[number];

export default getRequestConfig(async (params: GetRequestConfigParams): Promise<RequestConfig> => {
  const currentLocale =
    params.locale && routing.locales.includes(params.locale as Locales) ? params.locale : routing.defaultLocale;

  return {
    locale: currentLocale,
    messages: await requestMessages({ locale: currentLocale }),
    timeZone: appConfig.timezone,
  };
});

export type LoadMessagesParams = { locale: string };

export async function requestMessages(param: LoadMessagesParams) {
  return (await import(`../../public/generated/${param.locale}.json`)).default;
}
