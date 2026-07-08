'use client';

import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { timezoneAtom } from '@/atoms/timezone';
import { formatInTimeZone } from 'date-fns-tz';
import { intervalToDuration } from 'date-fns';
import { getNextRace, getStartLightsState } from '@/lib/season';

const GANTRY = [1, 2, 3, 4, 5];

function StartLights({ lit, lightsOut }: { lit: number; lightsOut: boolean }) {
  return (
    <div
      className="flex gap-2"
      role="img"
      aria-label={lightsOut ? 'Lights out — race in progress' : `${lit} of 5 start lights lit`}
      data-testid="start-lights"
    >
      {GANTRY.map((n) => (
        <span
          key={n}
          data-testid={`start-light-${n}`}
          data-lit={!lightsOut && n <= lit}
          className={`start-light ${!lightsOut && n <= lit ? 'start-light-on' : ''}`}
        />
      ))}
    </div>
  );
}

export function RaceCountdown() {
  const selectedTimezone = useAtomValue(timezoneAtom);
  const [now, setNow] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const countdownTimer = setInterval(() => setNow(new Date()), 1000);
    const fadeTimer = setTimeout(() => setIsVisible(true), 500); // Short delay for smoother transition

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!now) return <CountdownSkeleton />;

  const nextRace = getNextRace(now);
  if (!nextRace) {
    return (
      <div className="card mb-8 rounded-lg p-6">
        <h2 className="text-xl font-bold">Season complete 🏁</h2>
        <p className="text-sm text-gray-400">See you next year!</p>
      </div>
    );
  }

  const raceDate = new Date(nextRace.date);
  const { lit, lightsOut } = getStartLightsState(nextRace.date, now);
  const timeLeft = raceDate > now ? intervalToDuration({ start: now, end: raceDate }) : {};

  return (
    <div
      className={`card mb-8 rounded-lg p-6 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{lightsOut ? 'Race Day' : 'Next Race'}</h2>
        <StartLights lit={lit} lightsOut={lightsOut} />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-4xl">{nextRace.countryFlag}</span>
          <div>
            <h3 className="text-lg font-bold">{nextRace.name}</h3>
            <p className="text-xs text-gray-400">{nextRace.circuit}</p>
            <time className="text-sm text-gray-400">
              {formatInTimeZone(raceDate, selectedTimezone, 'PPP p')}
            </time>
          </div>
        </div>

        {lightsOut ? (
          <div className="lights-out-banner text-primary text-xl font-black uppercase lg:text-2xl">
            Lights out and away we go!
          </div>
        ) : (
          <div className="grid min-w-[300px] grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{timeLeft.days || '0'}</div>
              <div className="text-xs text-gray-400">DAYS</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{timeLeft.hours || '0'}</div>
              <div className="text-xs text-gray-400">HOURS</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{timeLeft.minutes || '00'}</div>
              <div className="text-xs text-gray-400">MINUTES</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{timeLeft.seconds || '00'}</div>
              <div className="text-xs text-gray-400">SECONDS</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CountdownSkeleton() {
  return (
    <div className="card mb-8 animate-pulse rounded-lg p-6">
      <div className="mb-4 h-7 w-24 rounded bg-gray-700" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded bg-gray-700" />
          <div>
            <div className="mb-2 h-6 w-48 rounded bg-gray-700" />
            <div className="h-4 w-32 rounded bg-gray-700" />
          </div>
        </div>
        <div className="grid min-w-[300px] grid-cols-4 gap-4 text-center">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="mx-auto mb-1 h-8 w-12 rounded bg-gray-700" />
              <div className="mx-auto h-4 w-16 rounded bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
