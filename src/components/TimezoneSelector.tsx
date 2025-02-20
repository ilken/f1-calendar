'use client';

import { timezoneAtom } from '@/atoms/timezone';
import { format, toZonedTime } from 'date-fns-tz';
import { useAtom } from 'jotai';

// Generate timezone options
const timezones = Intl.supportedValuesOf('timeZone').map((tz) => ({
  value: tz,
  label: `${tz} (${format(toZonedTime(new Date(), tz), 'xxx', { timeZone: tz })})`,
}));

export function TimezoneSelector() {
  const [selectedTimezone, setSelectedTimezone] = useAtom(timezoneAtom);

  return (
    <div className="mb-8">
      <label htmlFor="timezone-select" className="mb-2 block text-sm font-medium text-gray-300">
        Select Your Timezone
      </label>
      <select
        id="timezone-select"
        value={selectedTimezone}
        onChange={(e) => setSelectedTimezone(e.target.value)}
        className="focus:border-primary focus:ring-primary w-full max-w-md rounded-lg border border-gray-700 bg-black/30 p-3 text-lg text-white backdrop-blur-sm transition-colors hover:border-gray-600 focus:ring-1"
        aria-label="Timezone selector"
      >
        {timezones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
    </div>
  );
}
