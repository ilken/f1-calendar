import { Race, SEASON } from '@/data/calendar.data';
import { RACE_DURATION_MS } from './season';

const CRLF = '\r\n';

/** 2026-07-19T13:00:00Z -> 20260719T130000Z */
function toIcsUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

/** Escape per RFC 5545 TEXT rules */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function raceToVEvent(race: Race, dtStamp: Date): string[] {
  const start = new Date(race.date);
  const end = new Date(start.getTime() + RACE_DURATION_MS);
  const summary = `F1 · ${race.name} Grand Prix${race.isSprint ? ' (Sprint weekend)' : ''}`;
  const description = `Round ${race.round} of the ${SEASON} Formula 1 season. ${race.url}`;

  return [
    'BEGIN:VEVENT',
    `UID:f1-${SEASON}-round-${race.round}@f1-calendar-one.vercel.app`,
    `DTSTAMP:${toIcsUtc(dtStamp)}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeText(summary)}`,
    `LOCATION:${escapeText(`${race.circuit}, ${race.location}`)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:${race.url}`,
    'END:VEVENT',
  ];
}

function wrapCalendar(events: string[]): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//f1-calendar//F1 ${SEASON} Calendar//EN`,
    'CALSCALE:GREGORIAN',
    ...events,
    'END:VCALENDAR',
    '',
  ].join(CRLF);
}

export function buildRaceIcs(race: Race, dtStamp: Date = new Date()): string {
  return wrapCalendar(raceToVEvent(race, dtStamp));
}

export function buildSeasonIcs(races: Race[], dtStamp: Date = new Date()): string {
  return wrapCalendar(races.flatMap((race) => raceToVEvent(race, dtStamp)));
}

export function downloadIcs(filename: string, ics: string): void {
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
