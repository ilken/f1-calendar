import { render, screen, fireEvent } from '@testing-library/react';
import { RaceCalendar } from './RaceCalendar';
import { CALENDAR_DATA } from '@/data/calendar.data';

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

describe('RaceCalendar', () => {
  beforeEach(() => {
    mockOpen.mockClear();
    jest.useFakeTimers();
    // Mid-season: rounds 1-9 finished, Belgium (round 10) is next
    jest.setSystemTime(new Date('2026-07-08T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all race cards', () => {
    render(<RaceCalendar />);

    // Check if all races are rendered
    CALENDAR_DATA.forEach((race) => {
      expect(screen.getByText(race.name)).toBeInTheDocument();
      expect(screen.getByText(`#${race.round}`)).toBeInTheDocument();
    });
  });

  it('opens race URL in new tab when clicked', () => {
    render(<RaceCalendar />);

    const firstRace = CALENDAR_DATA[0];
    const raceCard = screen.getByRole('button', {
      name: `${firstRace.name} Grand Prix details`,
    });

    fireEvent.click(raceCard);

    expect(mockOpen).toHaveBeenCalledWith(firstRace.url, '_blank', 'noopener,noreferrer');
  });

  it('handles keyboard navigation', () => {
    render(<RaceCalendar />);

    const firstRace = CALENDAR_DATA[0];
    const raceCard = screen.getByRole('button', {
      name: `${firstRace.name} Grand Prix details`,
    });

    // Test Enter key
    fireEvent.keyDown(raceCard, { key: 'Enter' });
    expect(mockOpen).toHaveBeenCalledWith(firstRace.url, '_blank', 'noopener,noreferrer');

    mockOpen.mockClear();

    // Test Space key
    fireEvent.keyDown(raceCard, { key: ' ' });
    expect(mockOpen).toHaveBeenCalledWith(firstRace.url, '_blank', 'noopener,noreferrer');
  });

  it('dims finished races and marks the next one', () => {
    render(<RaceCalendar />);

    const finished = screen.getByRole('button', { name: 'Australia Grand Prix details' });
    expect(finished).toHaveClass('race-finished');
    expect(screen.getAllByText(/🏁 Finished/)).toHaveLength(9);

    const next = screen.getByRole('button', { name: 'Belgium Grand Prix details' });
    expect(next).toHaveClass('next-race-card');
    expect(next).not.toHaveClass('race-finished');
  });

  it('downloads an ics without triggering the card click', () => {
    render(<RaceCalendar />);

    const clickSpy = jest.fn();
    HTMLAnchorElement.prototype.click = clickSpy;
    URL.createObjectURL = jest.fn(() => 'blob:mock');
    URL.revokeObjectURL = jest.fn();

    fireEvent.click(
      screen.getByRole('button', { name: 'Add Belgium Grand Prix to your calendar' })
    );

    expect(clickSpy).toHaveBeenCalled();
    expect(mockOpen).not.toHaveBeenCalled();
  });
});
