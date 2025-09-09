import { getRequestConfig } from 'next-intl/server';
import { LoadMessagesParamsNode, requestMessagesNode } from './requestNode';

export default getRequestConfig(async (params) => {
  const locale = (await params.requestLocale) || 'pt';

  return {
    locale,
    defaultLocale: 'pt',
  };
});

export type LoadMessagesParams = LoadMessagesParamsNode;

export async function requestMessages(param: LoadMessagesParamsNode) {
  return requestMessagesNode(param);
}
