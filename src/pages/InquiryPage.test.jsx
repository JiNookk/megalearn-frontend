import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import InquiryPage from './InquiryPage';

jest.mock('../utils/getQueryParam', () => () => 1);

test('InquiryPage', async () => {
  delete window.location;
  window.location = new URL('http://localhost:8080/inquiries/1');

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <InquiryPage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText(/작성일/);
  screen.getByText(/조회수/);
  screen.getAllByText(/답변/);

  await waitFor(() => {
    screen.getByText('미해결');
    screen.getByText('질문 1');
    screen.getByText('tester');
  });
});
