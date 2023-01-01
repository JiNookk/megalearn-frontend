import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';

import CreateCourseBanner from './CreateCoursebanner';

const onNavigate = jest.fn();

test('CreateCourseBanner', async () => {
  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <CreateCourseBanner onNavigate={onNavigate} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText('내 강의 만들기');
  screen.getByText('강의보기');
  screen.getByText('저장');
});
