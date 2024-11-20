import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test suite for the App component.
 * This test checks if the "learn react" link is correctly rendered within the App component.
 */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
