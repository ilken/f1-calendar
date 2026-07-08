'use client';

import { useEffect, useState } from 'react';
import { timezoneAtom } from '@/atoms/timezone';
import { format, toZonedTime } from 'date-fns-tz';
import { useAtom } from 'jotai';

type TimezoneOption = { value: string; label: string };

export function TimezoneSelector() {
  const [selectedTimezone, setSelectedTimezone] = useAtom(timezoneAtom);
  // Offset labels depend on the runtime's tzdata, which can differ between
  // server and browser — generate them client-side to avoid hydration mismatches
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);

  useEffect(() => {
    setTimezones(
      Intl.supportedValuesOf('timeZone').map((tz) => ({
        value: tz,
        label: `${tz} (${format(toZonedTime(new Date(), tz), 'xxx', { timeZone: tz })})`,
      }))
    );
  }, []);

  return (
    <div className="mb-8">
      <label htmlFor="timezone-select" className="mb-2 block text-sm font-medium text-gray-300">
        Select Your Timezone
      </label>
      <select
        id="timezone-select"
        value={selectedTimezone}
        onChange={(e) => setSelectedTimezone(e.target.value)}
        className="w-full max-w-md rounded-lg border border-gray-700 bg-black/30 p-3 text-lg text-white backdrop-blur-sm transition-colors hover:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary"
        aria-label="Timezone selector"
      >
        {timezones.length === 0 ? (
          <option value={selectedTimezone}>{selectedTimezone}</option>
        ) : (
          timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
