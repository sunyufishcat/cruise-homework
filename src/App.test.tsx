import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders agent link', () => {
  render(<App />);
  const agentElement = screen.getByText(/AGENT/i);
  expect(agentElement).toBeInTheDocument();
});
