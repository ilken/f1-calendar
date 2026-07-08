import { CALENDAR_DATA, TOTAL_ROUNDS } from '@/data/calendar.data';
import {
  countFinishedRaces,
  getNextRace,
  getStartLightsState,
  isRaceFinished,
  isRaceLive,
} from './season';

// Belgian GP: 2026-07-19T13:00:00Z
const BELGIUM = CALENDAR_DATA[9];

const minutes = (n: number) => n * 60 * 1000;
const hours = (n: number) => n * minutes(60);
const days = (n: number) => n * hours(24);

const before = (iso: string, ms: number) => new Date(new Date(iso).getTime() - ms);
const after = (iso: string, ms: number) => new Date(new Date(iso).getTime() + ms);

describe('getStartLightsState', () => {
  it.each([
    [days(30), 1],
    [days(8), 1],
    [days(7), 2],
    [days(3), 2],
    [hours(48), 3],
    [hours(30), 3],
    [hours(24), 4],
    [hours(2), 4],
    [hours(1), 5],
    [minutes(5), 5],
  ])('with %d ms to go, lights %d of 5', (msBefore, expected) => {
    const state = getStartLightsState(BELGIUM.date, before(BELGIUM.date, msBefore));
    expect(state).toEqual({ lit: expected, lightsOut: false });
  });

  it('goes lights out when the race starts', () => {
    expect(getStartLightsState(BELGIUM.date, new Date(BELGIUM.date))).toEqual({
      lit: 0,
      lightsOut: true,
    });
    expect(getStartLightsState(BELGIUM.date, after(BELGIUM.date, hours(1)))).toEqual({
      lit: 0,
      lightsOut: true,
    });
  });

  it('is no longer lights out once the race is over', () => {
    expect(getStartLightsState(BELGIUM.date, after(BELGIUM.date, hours(3)))).toEqual({
      lit: 0,
      lightsOut: false,
    });
  });
});

describe('race status helpers', () => {
  it('marks a race finished 2 hours after the start', () => {
    expect(isRaceFinished(BELGIUM, after(BELGIUM.date, hours(1)))).toBe(false);
    expect(isRaceFinished(BELGIUM, after(BELGIUM.date, hours(2)))).toBe(true);
  });

  it('marks a race live between start and start + 2h', () => {
    expect(isRaceLive(BELGIUM, before(BELGIUM.date, minutes(1)))).toBe(false);
    expect(isRaceLive(BELGIUM, after(BELGIUM.date, minutes(30)))).toBe(true);
    expect(isRaceLive(BELGIUM, after(BELGIUM.date, hours(2)))).toBe(false);
  });
});

describe('getNextRace', () => {
  it('returns round 1 before the season starts', () => {
    expect(getNextRace(new Date('2026-01-01T00:00:00Z'))?.round).toBe(1);
  });

  it('returns the upcoming race mid-season', () => {
    expect(getNextRace(new Date('2026-07-08T00:00:00Z'))?.name).toBe('Belgium');
  });

  it('keeps returning the current race while it is live', () => {
    expect(getNextRace(after(BELGIUM.date, hours(1)))?.name).toBe('Belgium');
  });

  it('returns undefined after the season finale', () => {
    expect(getNextRace(new Date('2026-12-31T00:00:00Z'))).toBeUndefined();
  });
});

describe('countFinishedRaces', () => {
  it('is 0 before the season', () => {
    expect(countFinishedRaces(new Date('2026-01-01T00:00:00Z'))).toBe(0);
  });

  it('counts finished rounds mid-season', () => {
    // Rounds 1-9 (through Great Britain, Jul 5) are done by Jul 8
    expect(countFinishedRaces(new Date('2026-07-08T00:00:00Z'))).toBe(9);
  });

  it('is the full calendar after the finale', () => {
    expect(countFinishedRaces(new Date('2026-12-31T00:00:00Z'))).toBe(TOTAL_ROUNDS);
  });
});
