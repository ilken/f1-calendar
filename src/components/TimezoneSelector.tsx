'use client';

import { timezoneAtom } from '@/atoms/timezone';
import { format, toZonedTime } from 'date-fns-tz';
import { useAtom } from 'jotai';

// Generate timezone options
const timezones = Intl.supportedValuesOf('timeZone').map(tz => ({
  value: tz,
  label: `${tz} (${format(toZonedTime(new Date(), tz), 'xxx', { timeZone: tz })})`
}));

export function TimezoneSelector() {
  const [selectedTimezone, setSelectedTimezone] = useAtom(timezoneAtom);

  return (
    <div className="mb-8">
      <label 
        htmlFor="timezone-select"
        className="block text-sm font-medium mb-2 text-gray-300"
      >
        Select Your Timezone
      </label>
      <select
        id="timezone-select"
        value={selectedTimezone}
        onChange={(e) => setSelectedTimezone(e.target.value)}
        className="w-full max-w-md p-3 text-lg rounded-lg 
          bg-black/30 backdrop-blur-sm 
          text-white border border-gray-700 
          focus:border-primary focus:ring-1 focus:ring-primary 
          hover:border-gray-600 transition-colors"
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