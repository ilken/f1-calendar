import { render, screen, act } from '@testing-library/react';
import { RaceCountdown } from './RaceCountdown';

describe('RaceCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows the next race with countdown and proximity start lights', () => {
    // 4 days before the Belgian GP (2026-07-19T13:00:00Z) -> 2 lights
    jest.setSystemTime(new Date('2026-07-15T13:00:00Z'));

    render(<RaceCountdown />);

    expect(screen.getByText('Next Race')).toBeInTheDocument();
    expect(screen.getByText('Belgium')).toBeInTheDocument();
    expect(screen.getByText('Circuit de Spa-Francorchamps')).toBeInTheDocument();
    expect(screen.getByTestId('start-lights')).toHaveAttribute(
      'aria-label',
      '2 of 5 start lights lit'
    );
    expect(screen.getByText('DAYS')).toBeInTheDocument();
  });

  it('lights all five in the final hour and ticks the countdown', () => {
    jest.setSystemTime(new Date('2026-07-19T12:30:00Z'));

    render(<RaceCountdown />);

    expect(screen.getByTestId('start-lights')).toHaveAttribute(
      'aria-label',
      '5 of 5 start lights lit'
    );
    // 30:00 -> 29:59 after one tick
    expect(screen.getByText('30')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('29')).toBeInTheDocument();
    expect(screen.getByText('59')).toBeInTheDocument();
  });

  it('goes lights out while the race is live', () => {
    jest.setSystemTime(new Date('2026-07-19T13:30:00Z'));

    render(<RaceCountdown />);

    expect(screen.getByText('Race Day')).toBeInTheDocument();
    expect(screen.getByText(/lights out and away we go/i)).toBeInTheDocument();
    expect(screen.getByTestId('start-lights')).toHaveAttribute(
      'aria-label',
      'Lights out — race in progress'
    );
    expect(screen.queryByText('DAYS')).not.toBeInTheDocument();
  });

  it('shows the season complete card after the finale', () => {
    jest.setSystemTime(new Date('2026-12-31T00:00:00Z'));

    render(<RaceCountdown />);

    expect(screen.getByText(/season complete/i)).toBeInTheDocument();
  });
});
