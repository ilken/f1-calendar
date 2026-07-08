import { CALENDAR_DATA, Race } from '@/data/calendar.data';

/** A grand prix counts as "live" for 2 hours after lights out. */
export const RACE_DURATION_MS = 2 * 60 * 60 * 1000;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export function isRaceFinished(race: Race, now: Date = new Date()): boolean {
  return now.getTime() >= new Date(race.date).getTime() + RACE_DURATION_MS;
}

export function isRaceLive(race: Race, now: Date = new Date()): boolean {
  const start = new Date(race.date).getTime();
  return now.getTime() >= start && now.getTime() < start + RACE_DURATION_MS;
}

/** Next race to look forward to — stays on the current race while it is live. */
export function getNextRace(now: Date = new Date()): Race | undefined {
  return CALENDAR_DATA.find((race) => !isRaceFinished(race, now));
}

export function countFinishedRaces(now: Date = new Date()): number {
  return CALENDAR_DATA.filter((race) => isRaceFinished(race, now)).length;
}

export type StartLightsState = {
  /** How many of the 5 gantry lights are lit */
  lit: number;
  /** True while the race is live — all lights off, "away we go" */
  lightsOut: boolean;
};

/**
 * Start-light gantry state for a countdown to `raceDate`:
 * lights come on as the race approaches (1 week / 48h / 24h / 1h),
 * then go dark the moment the race starts — lights out and away we go.
 */
export function getStartLightsState(raceDate: string, now: Date = new Date()): StartLightsState {
  const msUntil = new Date(raceDate).getTime() - now.getTime();

  if (msUntil <= 0) {
    return { lit: 0, lightsOut: msUntil > -RACE_DURATION_MS };
  }
  if (msUntil <= HOUR_MS) return { lit: 5, lightsOut: false };
  if (msUntil <= DAY_MS) return { lit: 4, lightsOut: false };
  if (msUntil <= 2 * DAY_MS) return { lit: 3, lightsOut: false };
  if (msUntil <= 7 * DAY_MS) return { lit: 2, lightsOut: false };
  return { lit: 1, lightsOut: false };
}
