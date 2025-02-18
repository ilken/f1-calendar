'use client';

import Image from "next/image";
import { formatInTimeZone } from 'date-fns-tz';
import { CALENDAR_DATA } from "@/data/calendar.data";
import { useAtomValue } from 'jotai';
import { timezoneAtom } from '@/atoms/timezone';

export function RaceCalendar() {
  const selectedTimezone = useAtomValue(timezoneAtom);

  const formatRaceDate = (date: string) => {
    return formatInTimeZone(
      new Date(date),
      selectedTimezone,
      'dd MMM yyyy hh:mma'
    );
  };

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section aria-label="Race Calendar" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {CALENDAR_DATA.map((race) => (
        <article 
          key={race.round}
          className="card p-4 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition-colors cursor-pointer"
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
          <div className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm font-light text-gray-400" aria-label={`Round ${race.round}`}>
                #{race.round}
              </div>
              <span className="text-4xl" role="img" aria-label={`${race.countryFlag} flag`}>
                {race.countryFlag}
              </span>
            </div>
            <h2 className="text-2xl font-black mb-3 leading-tight">{race.name}</h2>
            <time 
              dateTime={new Date(race.date).toISOString()}
              className="text-lg font-bold text-primary"
            >
              {formatRaceDate(race.date)}
            </time>
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
      ))}
    </section>
  );
} 