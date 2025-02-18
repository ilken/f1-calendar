'use client';

import { useEffect, useState } from 'react';
import { CALENDAR_DATA } from '@/data/calendar.data';
import { useAtomValue } from 'jotai';
import { timezoneAtom } from '@/atoms/timezone';
import { formatInTimeZone } from 'date-fns-tz';
import { differenceInSeconds, intervalToDuration } from 'date-fns';

export function RaceCountdown() {
  const selectedTimezone = useAtomValue(timezoneAtom);
  const [timeLeft, setTimeLeft] = useState<Duration>({});

  const nextRace = CALENDAR_DATA.find(race => {
    return new Date(race.date) > new Date();
  });

  useEffect(() => {
    if (!nextRace) return;

    const timer = setInterval(() => {
      const now = new Date();
      const raceDate = new Date(nextRace.date);
      const diffInSeconds = differenceInSeconds(raceDate, now);
      
      if (diffInSeconds <= 0) {
        clearInterval(timer);
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: raceDate
      });

      setTimeLeft(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  if (!nextRace || !timeLeft.days) return null;

  return (
    <div className="mb-8 p-6 card rounded-lg">
      <h2 className="text-xl font-bold mb-4">Next Race</h2>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-4xl">{nextRace.countryFlag}</span>
          <div>
            <h3 className="font-bold text-lg">{nextRace.name}</h3>
            <time className="text-sm text-gray-400">
              {formatInTimeZone(new Date(nextRace.date), selectedTimezone, 'PPP p')}
            </time>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-center min-w-[300px]">
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