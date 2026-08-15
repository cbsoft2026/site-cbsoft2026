import { createTranslator } from 'next-intl';
import { requestMessagesNode as requestMessages } from '@/i18n/requestNode';

import { loadEvents } from '@/lib/api';
import { latexEscape } from '@/lib/export/latex';
import { prepareExportAssets } from '@/lib/export/images';
import { generatePDF } from '@/lib/export/pdf';
import { mapToObject } from '@/utils/mapToObject';
import { Event } from '@/types/event';

import path from 'path';

const projectRoot = process.cwd();

const locale = 'pt';

const paths = {
  template: path.join(projectRoot, 'templates', 'room-sessions.tex'),
  output: path.join(projectRoot, 'public', 'generated', 'export'),
  speakers: path.join(projectRoot, 'public', 'images', 'speakers'),
  images: path.join(projectRoot, 'public', 'images'),
  logos: path.join(projectRoot, 'public', 'images', 'logos'),
};

function toSpeakerImage(filename: string): string {
  return `${path.parse(filename).name}.png`;
}

function formatTime(date: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function formatWeek(date: string): string {
  return new Date(date).toLocaleDateString(locale, {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
  });
}

function getEventsByDay(filter: (event: Event) => boolean) {
  const events = mapToObject(loadEvents(locale));

  return Object.entries(events)
    .filter(([, event]) => {
      return filter(event);
    })
    .reduce<Record<string, Record<string, Event>>>((acc, [id, event]) => {
      const rooms = event.rooms ?? [];
      if (!event.schedule) return acc;

      const day = event.schedule.start.split('T')[0];

      rooms.forEach((category) => {
        if (!acc[day]) acc[day] = {};
        if (!acc[day][category]) acc[day][category] = {};

        acc[day][category][id] = event;
      });

      return acc;
    }, {});
}

(async () => {
  const messages = await requestMessages({ locale });

  const scheduleT = createTranslator({
    locale,
    messages,
    namespace: 'schedule',
  });

  const commonT = createTranslator({
    locale,
    messages,
    namespace: 'common',
  });

  function renderSession(event: Event) {
    const title = scheduleT.has(event.title) ? scheduleT(event.title) : event.title;

    const type = `${commonT(`eventos.${event.type}`)} · ${commonT(event.simposio)}`;

    const moderators = event.moderators?.length
      ? `\\sessionmoderators{${event.moderators
          .map((moderator) => `\\speaker{${latexEscape(toSpeakerImage(moderator.image))}}`)
          .join('')}}`
      : '';

    return [
      '\\sessiondivider',
      `\\sessiontime{${formatTime(event.schedule.start)}}`,
      '&',
      '\\sessioncontent{%',
      `\\sessiontype{${latexEscape(type)}}`,
      `\\sessiontitle{${latexEscape(title)}}`,
      moderators,
      '}',
      '\\\\[0.8cm]',
    ].join('\n');
  }

  function renderRoom(date: string, room: string, events: Record<string, Event>) {
    let content = '';

    const local = scheduleT.has(room) ? scheduleT(room) : room;

    const name = scheduleT.has(`${room}-name`) ? scheduleT(`${room}-name`) : room;

    content += `\\roomname{${name}}\n`;
    content += `\\roomlocal{${local}}\n`;
    content += `\\dateinfo{${formatWeek(date)}}\n`;

    content += '\\header\n';
    content += '\\noindent\\begin{xltabular}[l]{0.8\\textwidth}{TS}\n';

    Object.values(events)
      .sort((a, b) => {
        return new Date(a.schedule?.start ?? '').getTime() - new Date(b.schedule?.start ?? '').getTime();
      })
      .forEach((event) => {
        content += renderSession(event);
      });

    content += '\\end{xltabular}\n';
    content += '\\newpage\n';

    return content;
  }

  async function exportSessions() {
    const groupedByDay = getEventsByDay((event) => event.type != 'info' && event.type != 'artigo');

    await prepareExportAssets(paths);

    for (const [date, roomEvents] of Object.entries(groupedByDay)) {
      let content = '';
      for (const [room, events] of Object.entries(roomEvents)) {
        content += renderRoom(date, room, events);
      }
      await generatePDF(paths.template, paths.output, `session-${date}`, content);
    }
  }

  if (process.env.NODE_ENV === 'production') {
    exportSessions().catch((err) => {
      console.error('Erro ao exportar os dados:', err);
      process.exit(1);
    });
  }
})();
