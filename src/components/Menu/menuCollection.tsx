import { getTranslations } from 'next-intl/server';
import appConfig from '@/app/app.config';
import { withUTM } from '@/utils/utm';
import { programs } from '@/app/config/event-structure';

export type NavbarItemProps = {
  title: string;
  href?: string;
  items?: Array<NavbarItemProps>;
  className?: string;
  dropdownActive?: boolean;
  onClick?: () => any;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function findItemCollection(items: NavbarItemProps[], path: string): NavbarItemProps | undefined {
  for (const item of items) {
    if (item.href?.includes(path)) {
      return item;
    }

    if (item.items) {
      const found = findItemCollection(item.items, path);

      if (found) {
        return found;
      }
    }
  }

  return undefined;
}

export default function generatedCollection(t: Translator, commonT: Translator) {
  const womenLunch = programs.find((program) => program.slug == 'women-lunch');
  const cbsoftMenuItem: NavbarItemProps = {
    title: t('cbsoft.titulo', { ano: appConfig.year }),
    href: '/cbsoft',
    items: [
      { title: t('cbsoft.sobre'), href: '/cbsoft' },
      { title: t('cbsoft.organizacao'), href: '/cbsoft/organization' },
      { title: t('cbsoft.acomodacoes'), href: '/cbsoft/accommodation' },
      { title: t('cbsoft.dinner'), href: '/cbsoft/dinner' },
      { title: t('cbsoft.women-lunch'), href: withUTM(womenLunch?.url ?? '/women-lunch') },
      { title: t('schedule.titulo'), href: '/schedule/calendar' },
      { title: t('cbsoft.speakers'), href: '/cbsoft/speakers' },
      { title: t('cbsoft.volunteers'), href: '/cbsoft/volunteers' },
      { title: t('cbsoft.local'), href: '/cbsoft/location' },
      {
        title: t('cbsoft.experiences'),
        items: [
          { title: t('cbsoft.tourism'), href: '/cbsoft/tourism' },
          { title: t('cbsoft.shows'), href: '/cbsoft/shows' },
        ],
      },
      { title: t('cbsoft.special-activities'), href: '/cbsoft/special-activities' },
      { title: t('cbsoft.codigo_conduta'), href: '/cbsoft/code-of-conduct' },
      { title: t('cbsoft.edicoes_anteriores'), href: '/cbsoft/previous-editions' },
    ],
  };

  const sbesMenuItem: NavbarItemProps = {
    title: commonT('sbes'),
    href: '/symposiums/sbes',
    items: [
      {
        title: commonT('siglas.trilhas.special'),
        href: '/symposiums/sbes/special/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/special/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/special/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.pesquisa'),
        href: '/symposiums/sbes/pesquisa/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/pesquisa/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/pesquisa/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.educacao'),
        href: '/symposiums/sbes/educacao/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/educacao/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/educacao/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.ideias'),
        href: '/symposiums/sbes/ideias/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/ideias/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/ideias/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.tools'),
        href: '/symposiums/sbes/tools/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/tools/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/tools/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.industry'),
        href: '/symposiums/sbes/industry/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/industry/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/industry/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.ctic'),
        href: '/symposiums/sbes/ctic/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/ctic/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/ctic/papers' },
        ],
      },
      {
        title: commonT('siglas.trilhas.ctd'),
        href: '/symposiums/sbes/ctd/call',
        items: [
          { title: t('chamada_trabalhos'), href: '/symposiums/sbes/ctd/call' },
          { title: t('artigos_aceitos'), href: '/symposiums/sbes/ctd/papers' },
        ],
      },
      { title: t('events'), href: '/symposiums/sbes/event' },
    ],
  };

  const sblpMenuItem: NavbarItemProps = {
    title: commonT('sblp'),
    href: '/symposiums/sblp/call',
    items: [
      { title: t('chamada_trabalhos'), href: '/symposiums/sblp/call' },
      { title: t('events'), href: '/symposiums/sblp/event' },
      { title: t('artigos_aceitos'), href: '/symposiums/sblp/papers' },
    ],
  };

  const sbcarsMenuItem: NavbarItemProps = {
    title: commonT('sbcars'),
    href: '/symposiums/sbcars/call',
    items: [
      { title: t('chamada_trabalhos'), href: '/symposiums/sbcars/call' },
      { title: t('events'), href: '/symposiums/sbcars/event' },
    ],
  };

  const sastMenuItem = {
    title: commonT('sast'),
    href: '/symposiums/sast/call',
    items: [
      { title: t('chamada_trabalhos'), href: '/symposiums/sast/call' },
      { title: t('events'), href: '/symposiums/sast/event' },
    ],
  };

  const workshopsMenuItem: NavbarItemProps = {
    title: commonT('workshops'),
    href: '/workshops',
    items: [
      { title: t('chamada_trabalhos'), href: '/workshops' },
      { title: commonT('workshops_accepts'), href: '/workshops/accepted' },
      { title: t('events'), href: '/workshops/event' },
      { title: t('artigos_aceitos'), href: '/workshops/papers' },
    ],
  };

  const latamSchoolMenuItem: NavbarItemProps = {
    title: commonT('latam-school'),
    href: '/latam-school',
    items: [
      { title: t('chamada_trabalhos'), href: '/latam-school' },
      { title: t('events'), href: '/latam-school/event' },
    ],
  };

  const highSchoolMenuItem: NavbarItemProps = {
    title: commonT('high-school'),
    href: '/high-school',
    items: [
      { title: t('chamada_trabalhos'), href: '/high-school' },
      { title: t('events'), href: '/high-school/event' },
    ],
  };

  const artifactsMenuItem: NavbarItemProps = {
    title: commonT('artifacts'),
    href: '/artifacts',
    items: [
      { title: t('chamada_trabalhos'), href: '/artifacts' },
      { title: t('events'), href: '/artifacts/event' },
    ],
  };

  const aiware = programs.find((program) => program.slug == 'aiware');
  const aiwareMenuItem: NavbarItemProps = {
    title: commonT('aiware'),
    href: withUTM(aiware?.url ?? '/aiware'),
  };

  const softwareLivreMenuItem: NavbarItemProps = {
    title: commonT('software-livre'),
    href: '/software-livre',
  };

  return [
    cbsoftMenuItem,
    sbesMenuItem,
    sblpMenuItem,
    sbcarsMenuItem,
    sastMenuItem,
    workshopsMenuItem,
    artifactsMenuItem,
    latamSchoolMenuItem,
    highSchoolMenuItem,
    aiwareMenuItem,
    softwareLivreMenuItem,
  ];
}
