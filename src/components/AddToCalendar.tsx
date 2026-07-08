'use client';

import { CALENDAR_DATA, Race, SEASON } from '@/data/calendar.data';
import { buildRaceIcs, buildSeasonIcs, downloadIcs } from '@/lib/ics';

export function AddRaceToCalendarButton({ race }: { race: Race }) {
  return (
    <button
      type="button"
      className="mt-2 rounded-full border border-gray-700 px-3 py-1 text-xs font-bold text-gray-400 transition-colors hover:border-accent hover:text-accent"
      aria-label={`Add ${race.name} Grand Prix to your calendar`}
      onClick={(e) => {
        e.stopPropagation(); // keep the card's open-details click intact
        downloadIcs(
          `f1-${SEASON}-${race.name.toLowerCase().replace(/\s+/g, '-')}.ics`,
          buildRaceIcs(race)
        );
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      📅 Add to calendar
    </button>
  );
}

export function AddSeasonToCalendarButton() {
  return (
    <button
      type="button"
      className="rounded-full border border-gray-700 px-4 py-2 text-sm font-bold text-gray-400 transition-colors hover:border-accent hover:text-accent"
      onClick={() => downloadIcs(`f1-${SEASON}-season.ics`, buildSeasonIcs(CALENDAR_DATA))}
    >
      📅 Download full {SEASON} season (.ics)
    </button>
  );
}
