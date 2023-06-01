import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('renders learn react link', () => {
  test('render App', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
