import { redirect } from 'next/navigation';
import { defaultLang } from '@/types/locales';

export default function RootRedirect() {
  redirect(`/${defaultLang}`);
}
