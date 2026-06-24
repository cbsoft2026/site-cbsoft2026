import { coverSpeakers, speakers } from '@/data';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';
import SpeakerCard from '@/components/SpeakerCard';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/speakers', 'titulo');
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
    <article style={{ padding: '30px 0 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={t('titulo')}></Title>
      </header>
      <div className='container'>
        {speakersFiltered &&
          speakersFiltered.map((speaker, index) => <SpeakerCard key={index} speaker={speaker} size={240} />)}
      </div>
    </article>
  );
}
