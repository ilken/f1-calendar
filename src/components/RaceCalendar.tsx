'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { CALENDAR_DATA } from '@/data/calendar.data';
import { useAtomValue } from 'jotai';
import { timezoneAtom } from '@/atoms/timezone';
import { getNextRace, isRaceFinished, isRaceLive } from '@/lib/season';
import { AddRaceToCalendarButton } from '@/components/AddToCalendar';

export function RaceCalendar() {
  const selectedTimezone = useAtomValue(timezoneAtom);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const nextRace = now ? getNextRace(now) : undefined;

  const formatRaceDate = (date: string) => {
    return formatInTimeZone(new Date(date), selectedTimezone, 'dd MMM yyyy hh:mma');
  };

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section aria-label="Race Calendar" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {CALENDAR_DATA.map((race) => {
        const finished = now ? isRaceFinished(race, now) : false;
        const live = now ? isRaceLive(race, now) : false;
        const isNext = nextRace?.round === race.round;

        return (
          <article
            key={race.round}
            className={`card cursor-pointer overflow-hidden rounded-lg border border-gray-800 p-4 transition-colors hover:border-red-600 ${
              finished ? 'race-finished' : ''
            } ${isNext ? 'next-race-card' : ''}`}
            onClick={() => handleCardClick(race.url)}
            role="button"
            tabIndex={0}
            aria-label={`${race.name} Grand Prix details`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent page scroll on space
                handleCardClick(race.url);
              }
            }}
          >
            <div className="border-b border-gray-800 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="text-sm font-light text-gray-400"
                    aria-label={`Round ${race.round}`}
                  >
                    #{race.round}
                  </div>
                  {live && (
                    <span className="animate-pulse rounded-full border border-primary px-2 py-0.5 text-xs font-bold text-primary">
                      ● LIVE
                    </span>
                  )}
                  {!live && finished && (
                    <span className="rounded-full border border-gray-700 px-2 py-0.5 text-xs font-bold text-gray-400">
                      🏁 Finished
                    </span>
                  )}
                  {race.isSprint && (
                    <span className="rounded-full border border-accent px-2 py-0.5 text-xs font-bold text-accent">
                      ⚡ SPRINT
                    </span>
                  )}
                </div>
                <span className="text-4xl" role="img" aria-label={`${race.countryFlag} flag`}>
                  {race.countryFlag}
                </span>
              </div>
              <h2 className="mb-1 text-2xl font-black leading-tight">{race.name}</h2>
              <p className="mb-3 text-sm text-gray-400">
                {race.circuit} · {race.location}
              </p>
              <time
                dateTime={new Date(race.date).toISOString()}
                className="text-lg font-bold text-primary"
              >
                {formatRaceDate(race.date)}
              </time>
              <div>
                <AddRaceToCalendarButton race={race} />
              </div>
            </div>

            <div className="relative h-48 bg-transparent">
              <Image
                src={race.image}
                alt={`${race.name} Circuit Layout`}
                fill
                className="object-contain"
                priority={race.round <= 3} // Prioritize loading first 3 races
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}
