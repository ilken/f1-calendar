'use client';
import { RaceCalendar } from '@/components/RaceCalendar';
import { TimezoneSelector } from '@/components/TimezoneSelector';
import { Provider } from 'jotai';
import { RaceCountdown } from '@/components/RaceCountdown';
import { SeasonProgress } from '@/components/SeasonProgress';
import { SEASON } from '@/data/calendar.data';

export default function Home() {
  return (
    <Provider>
      <div className="flex min-h-screen flex-col">
        <div className="parallax-container" aria-hidden="true" data-testid="parallax-container">
          <div className="parallax-image" />
        </div>
        <div className="content-overlay flex flex-grow flex-col">
          <main className="flex-grow p-4 lg:p-8" id="main-content">
            <header className="mb-12">
              <h1 className="mb-2 text-5xl font-bold">F1 Schedule {SEASON}</h1>
              <p className="text-gray-400">
                F1 {SEASON} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR
              </p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.3em] text-accent">
                Forza Ferrari
              </p>
            </header>

            <RaceCountdown />
            <SeasonProgress />
            <TimezoneSelector />
            <RaceCalendar />
          </main>

          <footer className="border-t border-gray-800 p-8 text-center text-sm text-gray-400">
            <p>© {SEASON} i14u. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </Provider>
  );
}
