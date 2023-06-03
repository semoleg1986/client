import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  it('should render without errors', () => {
    render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
    );
  });
});
