import { coverSpeakers, speakers } from '@/data';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';
import SpeakerCard from '@/components/SpeakerCard';
import Heading from '@/components/Heading';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/speakers' });
  const title = t('titulo');

  return createPageMetadata(title);
}

export default async function SpeakersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/speakers' });

  const speakersFiltered = speakers
    .filter(
      (speaker) =>
        typeof speaker === 'object' &&
        speaker !== null &&
        !Array.isArray(speaker) &&
        speaker.name &&
        coverSpeakers.includes(speaker.id),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article style={{ padding: '30px 0 0' }} data-pagefind-body>
      <header className='container' style={{ marginBottom: 56 }}>
        <Heading as='title'>{t('titulo')}</Heading>
      </header>
      <div className='container'>
        {speakersFiltered &&
          speakersFiltered.map((speaker, index) => <SpeakerCard key={index} speaker={speaker} size={240} />)}
      </div>
    </article>
  );
}
