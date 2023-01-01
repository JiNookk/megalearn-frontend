import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import UploadCourseInfo from '../components/UploadCourseInfo';

import CreateCoursePage from './CreateCoursePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { courseId: 1 },
  }),
}));

jest.mock('../hooks/useCourseStore');

jest.mock('../hooks/useSectionStore');

jest.mock('../hooks/useLectureStore');

test('CreateCoursePage', async () => {
  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <CreateCoursePage Component={UploadCourseInfo} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText('내 강의 만들기');
  screen.getByText('강의보기');
  screen.getByText('저장');

  screen.getByText('강의제작');
  screen.getByText('❎ 커리큘럼');

  screen.getByText('설정');
  screen.getByText('✅ 강의설정');

  screen.getByText('제출하기');

  screen.getByRole('heading', { name: '강의정보' });
});
