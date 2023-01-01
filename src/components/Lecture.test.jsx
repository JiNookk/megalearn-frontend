import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { lectureStore } from '../stores/LectureStore';
import Lecture from './Lecture';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { lectureId: 2, courseId: 1 },
  }),
}));

jest.mock('../hooks/useProgressStore', () => () => ({
  fetchProgress: jest.fn(),
}));

describe('Lecture', () => {
  let container;

  beforeEach(async () => {
    await lectureStore.fetchLectures({ courseId: 1 });
    await lectureStore.fetchLecture({ courseId: 1, lectureId: 2 });

    container = render((
      <MemoryRouter>
        <Lecture />
      </MemoryRouter>
    )).container;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders components', async () => {
    screen.getByText('테스트 2강');
    screen.getByText('< 이전 수업');
    screen.getByText('다음 수업 >');

    await waitFor(() => {
      expect(container.getElementsByTagName('iframe')).toBeTruthy();
    });
  });
});
