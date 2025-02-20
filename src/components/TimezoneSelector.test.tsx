import { render, screen, fireEvent } from '@testing-library/react';
import { TimezoneSelector } from './TimezoneSelector';
import { useAtom } from 'jotai';

// Mock jotai
jest.mock('jotai', () => ({
  useAtom: jest.fn(),
}));

describe('TimezoneSelector', () => {
  const mockSetTimezone = jest.fn();

  beforeEach(() => {
    (useAtom as jest.Mock).mockReturnValue(['Europe/London', mockSetTimezone]);
  });

  it('renders timezone selector with label', () => {
    render(<TimezoneSelector />);

    expect(screen.getByLabelText('Select Your Timezone')).toBeInTheDocument();
  });

  it('shows current timezone value', () => {
    render(<TimezoneSelector />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Europe/London');
  });

  it('calls setTimezone when new timezone is selected', () => {
    render(<TimezoneSelector />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'America/New_York' } });

    expect(mockSetTimezone).toHaveBeenCalledWith('America/New_York');
  });

  it('renders all timezone options', () => {
    render(<TimezoneSelector />);

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);

    // Updated regex to match "Africa/Porto-Novo (+01:00)"
    options.forEach((option) => {
      expect(option.textContent).toMatch(/^[\w\/\-]+ \([+-]\d{2}:\d{2}\)$/);
    });
  });
});
