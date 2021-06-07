import { render, screen } from '@testing-library/react';
import App from './App';

// Tests won't work because I haven't bothered writing any yet.

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
