'use client';
import { RaceCalendar } from '@/components/RaceCalendar';
import { TimezoneSelector } from '@/components/TimezoneSelector';
import { Provider } from 'jotai';
import { RaceCountdown } from '@/components/RaceCountdown';

export default function Home() {
  return (
    <Provider>
      <div className="min-h-screen flex flex-col">
        <div className="parallax-container" aria-hidden="true">
          <div className="parallax-image" />
        </div>
        <div className="content-overlay flex flex-col flex-grow">
          <main className="p-8 flex-grow" id="main-content">
            <header className="mb-12">
              <h1 className="text-5xl font-bold mb-2">F1 Schedule 2025</h1>
              <p className="text-gray-400">
                F1 2025 FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR
              </p>
            </header>

            <RaceCountdown />
            <TimezoneSelector />
            <RaceCalendar />
          </main>
          
          <footer className="p-8 text-center text-sm text-gray-400 border-t border-gray-800">
            <p>© 2025 i14u. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </Provider>
  );
}
