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
  const cbsoftMenuItem: NavbarItemProps = {
    title: t('cbsoft.titulo', { ano: appConfig.year }),
    href: '/cbsoft',
    items: [
      { title: t('cbsoft.sobre'), href: '/cbsoft' },
      { title: t('cbsoft.organizacao'), href: '/cbsoft/organization' },
      { title: t('cbsoft.acomodacoes'), href: '/cbsoft/accommodation' },
      // { title: t('schedule.titulo'), href: '/schedule/calender/2026-09-08' },
      { title: t('cbsoft.speakers'), href: '/cbsoft/speakers' },
      { title: t('cbsoft.volunteers'), href: '/cbsoft/volunteers' },
      { title: t('cbsoft.local'), href: '/cbsoft/location' },
      { title: t('cbsoft.codigo_conduta'), href: '/cbsoft/code-of-conduct' },
      { title: t('cbsoft.edicoes_anteriores'), href: '/cbsoft/previous-editions' },
    ],
  };

  const sbesMenuItem: NavbarItemProps = {
    title: commonT('sbes'),
    href: '/symposiums/sbes',
    items: [
      { title: commonT('siglas.trilhas.special'), href: '/symposiums/sbes/special/call' },
      { title: commonT('siglas.trilhas.pesquisa'), href: '/symposiums/sbes/pesquisa/call' },
      { title: commonT('siglas.trilhas.educacao'), href: '/symposiums/sbes/educacao/call' },
      { title: commonT('siglas.trilhas.ideias'), href: '/symposiums/sbes/ideias/call' },
      { title: commonT('siglas.trilhas.tools'), href: '/symposiums/sbes/tools/call' },
      { title: commonT('siglas.trilhas.industry'), href: '/symposiums/sbes/industry/call' },
      { title: commonT('siglas.trilhas.ctic'), href: '/symposiums/sbes/ctic/call' },
      { title: commonT('siglas.trilhas.ctd'), href: '/symposiums/sbes/ctd/call' },
    ],
  };

  const sblpMenuItem: NavbarItemProps = {
    title: commonT('sblp'),
    href: '/symposiums/sblp/call',
  };

  const sbcarsMenuItem: NavbarItemProps = {
    title: commonT('sbcars'),
    href: '/symposiums/sbcars/call',
  };

  const sastMenuItem = { title: commonT('sast'), href: '/symposiums/sast/call' };

  const workshopsMenuItem: NavbarItemProps = {
    title: commonT('siglas.workshops'),
    href: '/workshops',
    items: [
      { title: t('chamada_trabalhos'), href: '/workshops' },
      { title: commonT('workshops_accepts'), href: '/workshops/accepted' },
    ],
  };

  const latamSchoolMenuItem: NavbarItemProps = {
    title: commonT('latam-school'),
    href: '/latam-school',
  };

  const highSchoolMenuItem: NavbarItemProps = {
    title: commonT('high-school'),
    href: '/high-school',
    // items: [
    //   { title: t('chamada_trabalhos'), href: '/high-school' },
    //   { title: t('events'), href: '/high-school/schedule' },
    // ],
  };

  const artifactsMenuItem: NavbarItemProps = {
    title: commonT('siglas.artifacts'),
    href: '/artifacts',
  };

  const aiware = programs.find((program) => program.slug == 'aiware');
  const aiwareMenuItem: NavbarItemProps = {
    title: commonT('siglas.aiware'),
    href: withUTM(aiware?.url ?? '/aiware'),
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
  ];
}
