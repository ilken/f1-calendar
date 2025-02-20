'use client';

import { useEffect, useState } from 'react';
import { CALENDAR_DATA } from '@/data/calendar.data';
import { useAtomValue } from 'jotai';
import { timezoneAtom } from '@/atoms/timezone';
import { formatInTimeZone } from 'date-fns-tz';
import { differenceInSeconds, intervalToDuration, Duration } from 'date-fns';

export function RaceCountdown() {
  const selectedTimezone = useAtomValue(timezoneAtom);
  const [timeLeft, setTimeLeft] = useState<Duration>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const nextRace = CALENDAR_DATA.find((race) => {
    return new Date(race.date) > new Date();
  });

  useEffect(() => {
    if (!nextRace) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 500); // Short delay for smoother transition

    const countdownTimer = setInterval(() => {
      const now = new Date();
      const raceDate = new Date(nextRace.date);
      const diffInSeconds = differenceInSeconds(raceDate, now);

      if (diffInSeconds <= 0) {
        clearInterval(countdownTimer);
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: raceDate,
      });

      setTimeLeft(duration);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [nextRace]);

  if (!nextRace || !timeLeft.days) return <CountdownSkeleton />;
  if (isLoading) return <CountdownSkeleton />;

  return (
    <div 
      className={`card mb-8 rounded-lg p-6 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <h2 className="mb-4 text-xl font-bold">Next Race</h2>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-4xl">{nextRace.countryFlag}</span>
          <div>
            <h3 className="text-lg font-bold">{nextRace.name}</h3>
            <time className="text-sm text-gray-400">
              {formatInTimeZone(new Date(nextRace.date), selectedTimezone, 'PPP p')}
            </time>
          </div>
        </div>

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