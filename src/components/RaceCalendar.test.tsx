import { render, screen, fireEvent } from '@testing-library/react';
import { RaceCalendar } from './RaceCalendar';
import { CALENDAR_DATA } from '@/data/calendar.data';

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

describe('RaceCalendar', () => {
  beforeEach(() => {
    mockOpen.mockClear();
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
    const raceCard = screen.getByRole('button', { name: new RegExp(firstRace.name) });
    
    fireEvent.click(raceCard);
    
    expect(mockOpen).toHaveBeenCalledWith(
      firstRace.url,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles keyboard navigation', () => {
    render(<RaceCalendar />);
    
    const firstRace = CALENDAR_DATA[0];
    const raceCard = screen.getByRole('button', { name: new RegExp(firstRace.name) });
    
    // Test Enter key
    fireEvent.keyDown(raceCard, { key: 'Enter' });
    expect(mockOpen).toHaveBeenCalledWith(
      firstRace.url,
      '_blank',
      'noopener,noreferrer'
    );
    
    mockOpen.mockClear();
    
    // Test Space key
    fireEvent.keyDown(raceCard, { key: ' ' });
    expect(mockOpen).toHaveBeenCalledWith(
      firstRace.url,
      '_blank',
      'noopener,noreferrer'
    );
  });
}); 