import { CALENDAR_DATA, Race, TOTAL_ROUNDS } from '@/data/calendar.data';
import { buildRaceIcs, buildSeasonIcs } from './ics';

// Belgian GP: 2026-07-19T13:00:00Z
const BELGIUM = CALENDAR_DATA[9];
const DTSTAMP = new Date('2026-07-08T12:00:00Z');

describe('buildRaceIcs', () => {
  const ics = buildRaceIcs(BELGIUM, DTSTAMP);

  it('produces a valid single-event calendar', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics).toContain('VERSION:2.0');
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
    expect(ics).toContain('END:VCALENDAR');
    // every line is CRLF-terminated
    expect(ics.replace(/\r\n/g, '').includes('\n')).toBe(false);
  });

  it('sets UTC start and a 2h race window', () => {
    expect(ics).toContain('DTSTART:20260719T130000Z');
    expect(ics).toContain('DTEND:20260719T150000Z');
    expect(ics).toContain(`DTSTAMP:20260708T120000Z`);
  });

  it('describes the race', () => {
    expect(ics).toContain('SUMMARY:F1 · Belgium Grand Prix');
    expect(ics).toContain('LOCATION:Circuit de Spa-Francorchamps\\, Spa\\, Belgium');
    expect(ics).toContain(`UID:f1-2026-round-${BELGIUM.round}@f1-calendar-one.vercel.app`);
    expect(ics).toContain(BELGIUM.url);
  });

  it('marks sprint weekends in the summary', () => {
    const sprintRace = CALENDAR_DATA.find((race) => race.isSprint) as Race;
    expect(buildRaceIcs(sprintRace, DTSTAMP)).toContain('(Sprint weekend)');
  });

  it('escapes special characters in text fields', () => {
    const tricky: Race = {
      ...BELGIUM,
      name: 'A;B,C\nD',
      circuit: 'Back\\slash',
    };
    const trickyIcs = buildRaceIcs(tricky, DTSTAMP);
    expect(trickyIcs).toContain('SUMMARY:F1 · A\\;B\\,C\\nD Grand Prix');
    expect(trickyIcs).toContain('LOCATION:Back\\\\slash\\,');
  });
});

describe('buildSeasonIcs', () => {
  it('bundles every round into one calendar', () => {
    const ics = buildSeasonIcs(CALENDAR_DATA, DTSTAMP);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(TOTAL_ROUNDS);
    expect(ics.match(/BEGIN:VCALENDAR/g)).toHaveLength(1);
    expect(ics.match(/UID:/g)).toHaveLength(TOTAL_ROUNDS);
  });
});
