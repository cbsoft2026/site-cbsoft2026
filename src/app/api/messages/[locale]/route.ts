import { NextResponse } from 'next/server';
import { requestMessages } from '@/i18n/request';

export async function GET(req: Request, context: { params: Promise<{ locale: string }> }) {
  const { locale } = await context.params;
  const messages = await requestMessages({ locale });
  return NextResponse.json(messages);
}
