import { render, screen } from '@testing-library/react';
import Home from './page';
import { SEASON } from '@/data/calendar.data';

describe('Home', () => {
  it('renders the header', () => {
    render(<Home />);

    expect(screen.getByText(`F1 Schedule ${SEASON}`)).toBeInTheDocument();
    expect(screen.getByText(/FIA FORMULA ONE WORLD CHAMPIONSHIP/)).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<Home />);

    expect(screen.getByText(new RegExp(`© ${SEASON} i14u`))).toBeInTheDocument();
  });

  it('includes main landmark', () => {
    render(<Home />);

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('has correct aria-hidden on parallax container', () => {
    render(<Home />);

    const parallax = screen.getByTestId('parallax-container');
    expect(parallax).toHaveAttribute('aria-hidden', 'true');
  });
});
