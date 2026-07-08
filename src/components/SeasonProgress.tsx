'use client';

import { useEffect, useState } from 'react';
import { SEASON, TOTAL_ROUNDS } from '@/data/calendar.data';
import { countFinishedRaces, getNextRace } from '@/lib/season';

function FerrariCar() {
  return (
    <svg viewBox="0 0 64 24" width="48" height="18" aria-hidden="true" className="ferrari-car">
      <rect x="1" y="8" width="7" height="6" rx="1" fill="var(--primary)" />
      <path d="M6 16 L16 12 L26 11 L33 7 L43 7 L48 11 L61 13.5 L61 16 Z" fill="var(--primary)" />
      <rect x="29" y="4" width="7" height="5" rx="2" fill="#15151e" />
      <rect x="53" y="12" width="10" height="2.5" rx="1" fill="var(--primary)" />
      <rect x="14" y="13.5" width="38" height="1.5" fill="var(--accent)" />
      <circle cx="15" cy="18" r="5" fill="#0b0b0f" />
      <circle cx="46" cy="18" r="5" fill="#0b0b0f" />
      <circle cx="15" cy="18" r="2" fill="#4b5563" />
      <circle cx="46" cy="18" r="2" fill="#4b5563" />
    </svg>
  );
}

export function SeasonProgress() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  if (!now) return null;

  const finished = countFinishedRaces(now);
  const nextRace = getNextRace(now);
  const percent = (finished / TOTAL_ROUNDS) * 100;

  return (
    <div className="card mb-8 rounded-lg p-6">
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold">Season Progress</h2>
        <p className="text-sm text-gray-400">
          {finished === TOTAL_ROUNDS ? (
            <>
              {TOTAL_ROUNDS} of {TOTAL_ROUNDS} races — that&apos;s a wrap on {SEASON} 🏁
            </>
          ) : (
            <>
              {finished} of {TOTAL_ROUNDS} races done
              {nextRace && (
                <>
                  {' · next: '}
                  <span className="font-bold text-foreground">
                    {nextRace.name} {nextRace.countryFlag}
                  </span>
                </>
              )}
            </>
          )}
        </p>
      </div>

      <div
        className="season-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={TOTAL_ROUNDS}
        aria-valuenow={finished}
        aria-label={`Season progress: ${finished} of ${TOTAL_ROUNDS} races complete`}
      >
        <div className="season-track-done" style={{ width: `${percent}%` }} />
        <div className="season-track-finish" />
        <div className="season-car" style={{ left: `${percent}%` }}>
          <FerrariCar />
        </div>
      </div>
    </div>
  );
}
