import { atomWithStorage } from 'jotai/utils';

// Using atomWithStorage to persist timezone selection in localStorage
export const timezoneAtom = atomWithStorage('timezone', 'Europe/London');
