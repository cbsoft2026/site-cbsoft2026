import { getRequestConfig } from 'next-intl/server';
import { LoadMessagesParamsNode, requestMessagesNode } from './requestNode';
import { defaultLang } from '@/types/locales';

export default getRequestConfig(async (params) => {
  const locale = (await params.requestLocale) || defaultLang;

  return {
    locale,
    defaultLocale: defaultLang,
  };
});

export type LoadMessagesParams = LoadMessagesParamsNode;

export async function requestMessages(param: LoadMessagesParamsNode) {
  return requestMessagesNode(param);
}
